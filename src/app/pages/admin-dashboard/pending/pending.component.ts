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
import {
	UploadCertificateComponent
} from '../total/dialog/upload_certificate';
import { config } from '../../../../../config';
import * as io from 'socket.io-client';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'ngx-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  providers:[ConfirmationService],
})
export class pendingComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name','email','view','Download','Upload','Uploaded_Download']; //,'verify'
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
  isDisabled : boolean = false;
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService,
    public dialog: MatDialog,
    private userService: UserService,
    private dialogService: NbDialogService,
    private changeDetectorRefs: ChangeDetectorRef,
    private confirmationService: ConfirmationService,) {
      this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      // if(this.user['role'] == 'sub-admin'){
      //   this.displayedColumns.pop();
      // }
    
      this.socket = io(config.socketioUrl);
      this.socket.on('verifyClient',servermsg => {
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
          return this.api!.getPendingApplications(
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
    }
  
    onSelection(e, row){
     length = this.selection.isSelected.length -1;
      //console.log("this.selection.selected "+ JSON.stringify(this.selection.selected[length]['id']));
      //console.log(this.selection.selected[length]['id']);
     
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
  }

  onSelectionverify(e, row){
    
    //TODO : 
    //1  make component readonly for individual rows
    //this.isDisabled=true;
    //console.log(row);
    //2 fire socket to update all connected user that it is checked
    //create and call refresh
    this.socket.emit('verifyClicked',row);
    
    if(this.selectionverify.selected.length != 0){
    this.api.updateVerifiedBy(this.user['email'], this.selectionverify.selected[this.selectionverify.selected.length-1]['id'])
      .subscribe(result =>{ 
         // console.log(JSON.stringify(result));
    });
    this.api.sendNotifications(this.selectionverify.selected[this.selectionverify.selected.length-1]['id'])
    .subscribe(result =>{
       // console.log(result);
    });
    
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
          return this.api!.getPendingApplications(
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

  
  downloadApplicationLetter(email,user_id) {
    this.loading = true;
    this.api.downloadApplicationLetter(email, user_id)
      .subscribe(result =>{
          if(result['status'] == 200){
            var filename = 'Preview_data.pdf'
            this.api.downloadFilesAdmin(filename,user_id)
            .subscribe(data => {
              this.loading = false;
              saveAs(data, filename);
            });
          }else if(result['status'] == 400){
            this.api.generatepreviewLetter(user_id)
            .subscribe(data =>{
              if(data['status'] == 200){
                var filename = 'Preview_data.pdf'
                this.api.downloadFilesAdmin(data['data'],user_id)
                .subscribe(data => {
                  this.loading = false;
                  saveAs(data, filename);
                });
              }else if(data['status'] == 400){
                this.loading = false;
                alert(data['message']);
              }
            })
          }
    });
   }

   uploadCertificate(email,user_id,application_id,aiu_certificate){
    this.dialogService.open(UploadCertificateComponent, {
			context: {
        user_id : user_id,
        email : email,
        application_id : application_id,
        aiu_certificate : aiu_certificate
			},
		}).onClose
		.subscribe(
			(data: any) => {
        this.ngAfterViewInit();
				
			}
		)
  }

  verifyCertificate(email,user_id,application_id,aiu_certificate){
    this.confirmationService.confirm({
      message: 'Do you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-check',
      accept: () => {
        this.api.verifyCertificate(email,user_id,application_id,aiu_certificate)
        .subscribe(data => {
          this.ngAfterViewInit();
        });
      },
      reject:()=>{
      }    
    });
    
  }

  downloadCertificate(email,user_id,id,certificate_name){
    if(certificate_name==null){
      alert("You Have Not uploaded Certificate.");
    }else{
      this.api.downloadFilesAdmin(certificate_name,user_id)
        .subscribe(data => {
          this.loading = false;
          saveAs(data, certificate_name);
        });
    }
  }
}



