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
import { config } from '../../../../../config';
import * as io from 'socket.io-client';

@Component({
  selector: 'ngx-signed',
  templateUrl: './signed.component.html',
  styleUrls: ['./signed.component.scss']
})
export class SignedComponent implements AfterViewInit {

  displayedColumns: string[] = ['id','name', 'user_id', 'view', 'emailstatus'];
  data: application[] = [];
  dataSource: MatTableDataSource<application>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  socket: SocketIOClient.Socket;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService,
    private dialogService: NbDialogService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) {

      this.socket = io(config.socketioUrl);
      this.socket.on('SignClient',servermsg => {
        
        console.log(servermsg);
        //update dataset here
        this.refresh();
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
          return this.api!.getSignedApplications(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          this.dataSource = new MatTableDataSource(data.items);
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
  handleClick(user_id) {
    // console.log('clicked ', user_id);
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

   
  refresh(){
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.api!.getVerifiedApplications(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          this.dataSource = new MatTableDataSource(data.items);
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
    this.changeDetectorRefs.detectChanges();
  }

}
