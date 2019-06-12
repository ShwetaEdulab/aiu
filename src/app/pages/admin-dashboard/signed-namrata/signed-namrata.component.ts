import {Component, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import {merge,  of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {application } from '../../../model/application';
import {
	ShowTranscriptComponent
} from '../total/dialog/show-transcript.component';
import { NbDialogService } from '@nebular/theme';
import { NativeDateAdapter, DateAdapter, MatDatepicker } from '@angular/material';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { config } from '../../../../../config';

const moment = _moment;

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var formatString = 'MMMM YYYY';
    return moment(date).format(formatString);
  }
}

@Component({
  selector: 'ngx-signed-namrata',
  templateUrl: './signed-namrata.component.html',
  styleUrls: ['./signed-namrata.component.scss']
})
export class SignedNamrataComponent implements AfterViewInit {

  displayedColumns: string[] = ['email','subject','status','opens_count','clicks_count','last_event_time'];
  data: application[] = [];
  dataSource: MatTableDataSource<application>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  email_pie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
  loadingbutton;
  show_emailPie;
  


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService,
    public dialog: MatDialog,
    private dialogService: NbDialogService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  @ViewChild(MatDatepicker) picker;
  date = new FormControl();

  monthSelected(params) {
		console.log('here@@@@');
		console.log('params=======>'+params);
		this.show_emailPie = 0;
    this.date.setValue(params);
		this.picker.close();
		this.loadingbutton = true;
		this.api.getEmailActivityTrackerMonthWise(params).subscribe(data =>{
			console.log('count=========>'+data['data']);
			console.log('total_mails=========>'+data['total_mails']);
			console.log('open_count=========>'+data['open_count']);
			console.log('not_open=========>'+data['not_open']);
			this.loadingbutton = false;
			this.show_emailPie = 1;
			this.email_pie = {
				labels: ['Emails Opened','Emails Not Opened'],
				datasets: [
						{
								data: [	data['open_count'], data['not_open'] 	],
								backgroundColor: [
									"#88C443",
									"#F3354C"
								],
								hoverBackgroundColor: [
									"#FFCE56",
									"#FF6384"
								]
						}]    
				};
		});
  }

  ngAfterViewInit(){
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.api!.getSigned_namrata_Applications(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
         
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          this.dataSource = new MatTableDataSource(data.items);
          this.dataSource.paginator = this.paginator;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.data = data
        this.api.getEmailActivityTracker().subscribe(data =>{
            this.isLoadingResults = false;
        });
      });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleClick(user_id) {
    this.dialogService.open(ShowTranscriptComponent, {
			context: {
        user_id : user_id
			},
		}).onClose
		.subscribe(
			(data: any) => {
				
			}
		)
  }
}
