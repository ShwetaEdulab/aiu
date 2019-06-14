import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiService } from '../../../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nb-dialog',
  template: `
  <nb-card [style.width.px]="500"  [style.height.px]="600" status="success">
    <nb-card-header>
    <div class="row">
      <div class="col-md-11" style="text-align:center;">
        <h2><b>View Documents</b></h2>
      </div>
      <div class="col-md-1">
        <nb-action icon="ion-close-round" (click)="dismiss()"></nb-action>
      </div>
    </div>
    </nb-card-header>
    <nb-card-body>
      <div style="text-align:right;font-size: 200%;color:red">
        <h6 style="text-align:right;color:black">Errata  
          <i class="fa ion-android-lock" style="font-size: 180%;color:red" nbPopover="Errata:If any transcript blur or password protected then click on this button." nbPopoverMode="hover" (click)="errata()"></i>
        </h6>
      </div>
      <div *ngIf="ssc != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ ssc?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='ssc?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(ssc?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='ssc?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="ssc?.file_name" (click)="download(ssc?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="ssc_passing != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ ssc_passing?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='ssc_passing?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(ssc_passing?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='ssc_passing?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="ssc_passing?.file_name" (click)="download(ssc_passing?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="fyjc != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ fyjc?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='fyjc?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(fyjc?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='fyjc?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="fyjc?.file_name" (click)="download(fyjc?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="hsc != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ hsc?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='hsc?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(hsc?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='hsc?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note : Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="hsc?.file_name" (click)="download(hsc?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="hsc_passing != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ hsc_passing?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='hsc_passing?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(hsc_passing?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='hsc_passing?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="hsc_passing?.file_name" (click)="download(hsc_passing?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="degree != undefined" style="text-align:center;"> 
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4" style="text-align:center;">
            <h1>
              <b>
                {{ degree?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='degree?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(degree?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='degree?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="degree?.file_name" (click)="download(degree?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="degree_certificate != undefined" style="text-align:center;"> 
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-5" style="text-align:center;">
            <h1>
              <b>
                {{ degree_certificate?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='degree_certificate?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(degree_certificate?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='degree_certificate?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="degree_certificate?.file_name" (click)="download(degree_certificate?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="master != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ master?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='master?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(master?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='master?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="master?.file_name" (click)="download(master?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br> 
      <br>
      <div *ngIf="master_certificate != undefined" style="text-align:center;"> 
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-5" style="text-align:center;">
            <h1>
              <b>
                {{ master_certificate?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='master_certificate?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(master_certificate?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='master_certificate?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="master_certificate?.file_name" (click)="download(master_certificate?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="phd != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>{{ phd?.type }}</b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='phd?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(phd?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='phd?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="phd?.file_name" (click)="download(phd?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="course_letter != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ course_letter?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='course_letter?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(course_letter?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='course_letter?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="course_letter?.file_name" (click)="download(course_letter?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="offer_letter != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ offer_letter?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='offer_letter?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(offer_letter?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='offer_letter?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="offer_letter?.file_name" (click)="download(offer_letter?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="passport != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ passport?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='passport?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(passport?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='passport?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="passport?.file_name" (click)="download(passport?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div *ngIf="visa != undefined" style="text-align:center;">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h1>
              <b>
                {{ visa?.type }}
              </b>
            </h1>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='visa?.file_ext == "pdf"' class="row" style="text-align:center;">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button nbButton (click)="download(visa?.file_name)" status='info'>DOWNLOAD</button>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div *ngIf='visa?.file_ext != "pdf"'>
          <div class="row" style='color:red'>
            <div class="col-md-1"></div>
            <div class="col-md-10">
              Note :- Click on image to download
            </div>
            <div class="col-md-1"></div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <img class="img-responsive" style= "width: 200px; height:200px;" [src]="visa?.file_name" (click)="download(visa?.file_name)"/>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
    </nb-card-body>
    <nb-card-footer>
    <div style="text-align:center;font-size: 150%;">
      <button  nbButton hero status="primary" (click)="dismiss()">Close</button>
      </div>
      
    </nb-card-footer>
  </nb-card> 
  `,
 // styleUrls: ['./show-transcript.component.scss']
})
export class ShowTranscriptComponent implements OnInit {
  @Input() user_id ;
  ssc  = {
    type:'',
    file_name:'',
    file_ext: ''
  }
  ssc_passing= {
    type:'',
    file_name:'',
    file_ext: ''
  }
  fyjc= {
    type:'',
    file_name:'',
    file_ext: ''
  }
  hsc  = {
    type:'',
    file_name:'',
    file_ext: ''
  }
  hsc_passing= {
    type:'',
    file_name:'',
    file_ext: ''
  }
  degree  = {
    type:'',
    file_name:'',
    file_ext: ''
  }
  degree_certificate = {
    type:'',
    file_name:'',
    file_ext: ''
  }
  master  = {
    type:'',
    file_name:'',
    file_ext: ''
  }
  master_certificate= {
    type:'',
    file_name:'',
    file_ext: ''
  }
  phd  = {
    type:'',
    file_name:'',
    file_ext: ''
  }
  course_letter = {
    type:'',
    file_name:'',
    file_ext: ''
  }
  offer_letter= {
    type:'',
    file_name:'',
    file_ext: ''
  }
  passport= {
    type:'',
    file_name:'',
    file_ext: ''
  }
  visa= {
    type:'',
    file_name:'',
    file_ext: ''
  }
  constructor(protected ref: NbDialogRef<ShowTranscriptComponent>,
    protected api : ApiService,
    private router : Router,
    private dialogService: NbDialogService) { }

  ngOnInit() {
    this.api.getTranscriptDetails(this.user_id).subscribe( data => {
      if(data['status'] == 200){
        this.ssc = data['data']['ssc'][0];
        this.ssc_passing = data['data']['ssc_passing'][0];
        this.fyjc = data['data']['fyjc'][0];
        this.hsc = data['data']['hsc'][0];
        this.hsc_passing = data['data']['hsc_passing'][0];
        this.degree = data['data']['degree'][0];
        this.degree_certificate = data['data']['degree_certificate'][0];
        this.master = data['data']['master'][0];
        this.master_certificate = data['data']['master_certificate'][0];
        this.phd = data['data']['phd'][0];
        this.course_letter = data['data']['course_letter'][0];
        this.offer_letter = data['data']['offer_letter'][0];
        this.passport = data['data']['passport'][0];
        this.visa = data['data']['visa'][0];
      }else if(data['status'] == 400){
        this.ref.close();
        alert('There is an issue in application.No Trascript found!!!');
      }
    });
  }

  download(filename){
    filename = filename.split('/').pop();
    this.api.downloadFilesAdmin(filename,this.user_id)
    .subscribe(data => {
      saveAs(data, filename);
    });
  }


  errata(){
    this.ref.close();
    this.router.navigate(['pages/adminErrata'],{queryParams:{userId : this.user_id}});
}

  dismiss(){
    this.ref.close();
  }

}
