import { Component, AfterViewInit, ViewChild, OnInit, Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../../../config';
import {application } from '../../../model/application';
import { ApiService } from '../../../shared/api.service';
import { UserService } from '../../../@core/data/users.service';
import {
	ShowTranscriptComponent
} from './dialog/show-transcript.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'tracker', 'email','view'];

  data: application[] = [];
  dataSource: MatTableDataSource<application>;
  //selection = new SelectionModel<application>(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  user: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private api : ApiService,
    private userService: UserService,
    private dialogService: NbDialogService,
   ) {
    this.userService.onUserChange()
    .subscribe((user: any) => this.user = user);
  }
  ngOnInit() {

  }


  ngAfterViewInit(){
    
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.api!.getTotalApplications(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

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
      ).subscribe(data => this.data = data);
      
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  //       console.log("all clicked ");
  // }

  // onSelection(e, row){
  //   //console.log("event "+ e);
  //   //console.log("row "+ JSON.stringify(row));
  //   console.log("this.selection.selected "+ JSON.stringify(this.selection.selected));
  //   //console.log("this.selection.selected "+ this.selection.selected['id']);
  //  }

  handleClick(user_id) {
    console.log("userid : "+user_id);
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

  handleRefresh(){
    window.location.reload();
  }


}
