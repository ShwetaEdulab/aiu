import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {application } from '../../../model/application';
import { ApiService } from '../../../shared/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../../@core/data/users.service';
import { NbDialogService } from '@nebular/theme';
import {
	ShowTranscriptComponent
} from '../total/dialog/show-transcript.component';
import { config } from '../../../../../config';
import * as io from 'socket.io-client';

@Component({
  selector: 'ngx-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent implements AfterViewInit {  

  displayedColumns: string[] = ['id', 'name', 'email','view','approved_by','sign'];
  data: application[] = [];
  dataSource: MatTableDataSource<application>;
  selection = new SelectionModel<application>(true, []);
  selectionverify = new SelectionModel<application>(true, []);
  length :number ;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  user: any;
  socket: SocketIOClient.Socket;
  // isDisabled : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService,
    public dialog: MatDialog,
    private userService: UserService,
    private dialogService: NbDialogService,
    private changeDetectorRefs: ChangeDetectorRef) {
      this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      if(this.user['role'] == 'sub-admin'){
        this.displayedColumns.pop();
      }

      this.socket = io(config.socketioUrl);
      this.socket.on('SignClient',servermsg => {
        
        console.log(servermsg);
        //update dataset here
        this.refresh();
      });
      this.socket.on('verifyClient',servermsg => {
        
        console.log(servermsg);
        //update dataset here
        this.refresh();
      })
  }

  ngAfterViewInit(){
    
    // If the user changes the sort order, reset back to the first page.
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

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
          console.log("all clicked ");
    }
      /**@author:Priyanka Khandagale
       /*it will sign the document using unique application id */
      signpdf(appl_id){
       this.api.signpdf(appl_id).subscribe(pdf=>{
        // console.log("got response on signpdf"+JSON.stringify(pdf));
       })
      }

       /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedverify() {
    const numSelected = this.selectionverify.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleVerify() {
    this.isAllSelectedverify() ?
        this.selectionverify.clear() :
        this.dataSource.data.forEach(row => this.selectionverify.select(row));
        console.log("all clicked ");
  }
  onSelectionverify(e, row){
    
    //TODO : 
    //1  make component readonly for individual rows
    //this.isDisabled=true;
    //console.log(row);
    //2 fire socket to update all connected user that it is checked
    //create and call refresh
    
  this.socket.emit('SignClicked',row);
  
  this.api.sendNotifications(this.selectionverify.selected[this.selectionverify.selected.length-1]['id'])
  .subscribe(result =>{
      console.log(result);
  });

  length = this.selectionverify.isSelected.length -1;
         this.selectionverify.selected.forEach(row =>{
           var temp_id=row['id'];
           //console.log("id===>"+temp_id);
          // console.log("row===>"+JSON.stringify(row['id']));
           this.signpdf(this.selectionverify.selected[this.selectionverify.selected.length-1]['id']);
         })
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



