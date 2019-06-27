import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../../shared/api.service';
import 'rxjs/Rx';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup,FormBuilder,Validators, ValidatorFn } from '@angular/forms';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../@core/data/users.service';
import { NbToastrService, NbDialogService, NbStepperComponent } from '@nebular/theme';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng/components/common/api';
import {ConfirmationService} from 'primeng/api';
import {config} from '../../../../config';
import {
  CountriesService
} from '../../@core/data/countries.service';
import {
	paymentOptionsDialog
} from './dialog/paymentOptionsDialog';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import {
  TranscriptDialogComponent
} from './dialog/transcriptdialogcomponent';

@Component({
  selector: 'ngx-attestation-page',
  templateUrl: './attestation-page.component.html',
  styleUrls: ['./attestation-page.component.scss'],
  providers: [MessageService,ConfirmationService,HeaderComponent],
})
export class AttestationPageComponent implements OnInit {

  @ViewChild('stepper') stepper: NbStepperComponent;

  profileForm: FormGroup;
  selectedGender : any;
  max : any;
  date : any;
  profile :any = {};
  Countries: any[];
  firstdob: any;
  mobile_country_code: any;
  Country_id_personal: any;
  readonly mobileValidate = /^[0-9]\d{5,12}$/;
  readonly charValidate = /^[.a-zA-Z ]*$/;
  readonly postalValidate = /^[a-zA-Z0-9 ]+$/;
  
  source;
  settings = {
    add: {
      addButtonContent: 'ADD TO CART', //<i class="nb-plus"></i>
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      universityName: {
        title: 'University Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      country: {
        title: 'Country',
        type: 'string',
      },
      contactNumber: {
        title: 'Contact Number',
        type: 'number',
      },
    },
  };
  user_id;
  sign_lock;
  ssc_lock;
  ssc_passing_lock;
  fyjc_lock;
  hsc_lock;
  hsc_passing_lock;
  degree_lock;
  degree_certificate_lock;
  master_lock;
  master_certificate_lock;
  phd_lock;
  course_letter_lock;
  offer_letter_lock;
  passport_lock;
  visa_lock;
  master_upload = false;
  phd_upload = false;
  transSIGNUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=SIGN_Document&hiddentype=SIGN";
  transSSCUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=SSC_Document&hiddentype=SSC";
  transFYJCUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=FYJC_Document&hiddentype=FYJC";
  transSSCPassingUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=SSC_Passing_Document&hiddentype=SSC_Passing";
  transHSCUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=HSC_Document&hiddentype=HSC";
  transHSCPassingUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=HSC_Passing_Document&hiddentype=HSC_Passing";
  transDegreeUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=DEGREE_Document&hiddentype=Graduation";
  transDegreeCertificateUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=DEGREE_Certificate&hiddentype=Degree_Certificate";
  transMastersUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=MASTER_Document&hiddentype=Master";
  transMasterCertificateUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=MASTER_Certificate_Document&hiddentype=Master_Certificate";
  transPhDUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=Ph.D_Document&hiddentype=Ph.D";
  transCourseLetterUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=Course_Duration_Document&hiddentype=Course_Letter";
  transOfferLetterUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=Offer_Letter_Document&hiddentype=Offer_Letter";
  transPassportUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=Passport_Document&hiddentype=Passport";
  transVisaUrl = config.transUploadUrl+"?user_id=" + this.giveUSER_Id() + "&transcript_name=Visa_Document&hiddentype=Visa";


  educationalForm : FormGroup;

  //validation pattern
 // readonly charValidate = /^[.a-zA-Z ]*$/;
  readonly marksValidate = /^[0-9 ]+$/;
  readonly passportValidate = /^[a-zA-Z0-9]*$/;

  //hidden values for input
  inputSsc: string;
  inputFyjc:string;
  inputHsc: string;
  inputGradValue: string;
  inputMasterValue: string;
  inputphdValue: string;

  //arrays for seting values
  ssc_info  = {
    ssc_name:'',
    school_name:'',
    totalmarks:'',
    outofmarks:''
  }
  fyjc_info = {
    fyjc_name :'',
    fyjc_school_name:'',
    fyjc_totalmarks:'',
    fyjc_outofmarks:''
  }
  hsc_info ={
    hscname :'',
    hsc_school_name :'',
    hsc_totalmarks:'',
    hsc_outofmarks:'',
  }
  degree_info = {
    gradname :'',
    grad_school_name :'',
    grad_totalmarks :'',
    grad_outofmarks :'',
  }
  master_info={
    mastername :'',
    master_school_name:'',
    master_totalmarks :'',
    master_outofmarks :'',
  }
  phd_info={
    phdname :'',
    phd_school_name:'',
    phd_totalmarks :'',
    phd_outofmarks :'',
  }

  sign_document : boolean = false;
  ssc_document : boolean = false;
  ssc_passing_document : boolean = false;
  fyjc_document : boolean = false;
  hsc_document : boolean = false;
  hsc_passing_document : boolean = false;
  degree_document : boolean = false;
  degree_certificate_document : boolean = false;
  master_document : boolean = false;
  master_certificate_document : boolean = false;
  phd_document : boolean = false;
  course_letter_document : boolean = false;
  offer_letter_document : boolean = false;
  passport_document : boolean = false;
  visa_document: boolean = false;

  applying_for: any;
  show_institution_card :boolean =  false;
  transcript_completed : boolean = false;
  form_submitted: boolean;
  currenttoken: NbAuthJWTToken;
  user: any;
  index: number;

  loadingsignbutton = false;
  loadingsscbutton = false;
  loadingsscpassingbutton = false;
  loadingfyjcbutton = false;
  loadinghscbutton = false;
  loadinghscpassingbutton = false;
  loadingdegreebutton = false;
  loadingdegreecertificatebutton = false;
  loadingmasterbutton = false;
  loadingmastercertificatebutton = false;
  loadingphdbutton= false;
  loadingcourseletterbutton = false;
  loadingofferletterbutton = false;
  loadingpassportbutton = false;
  loadingvisabutton = false;
  loading = false;

  msgs: Message[] = [];
  Dropdownvar: any;
  testradio: string;
  show_address_message = false;
  address_message;
  program_value: any;
  programDataerror = false;
  program_error_message;
  pass_info: any;
  permCountry: any;
  permcountryValidation = true;
  show_payment_button : boolean = false ;
  payment_data: any;
  application_id: any;
  moreDocs: any;

  constructor(protected api : ApiService,
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,
    private authService: NbAuthService,
    private userService: UserService,
    private toastrService: NbToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    protected countries: CountriesService,
    private dialogService: NbDialogService,
    private comp: HeaderComponent,
    ){
      this.Countries = this.countries.getData();
  }

  
  onCreateConfirm(event) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to create?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        event.confirm.resolve();
        this.api.createInstitute(event.newData['universityName'],event.newData['email'],event.newData['country'],event.newData['contactNumber'])
        .subscribe(data => {
          if(data['status'] == 200){
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Success Message', detail:'Institute data added to cart successfully'});
          }else if(data['status'] == 400){
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in adding to cart.Please try again!!!!!!'});
          }  
        });
        this.ngOnInit();   
      },
      reject:() =>{
        event.confirm.reject();
      }
    });
  }

  onSaveConfirm(event) {
    if(event.newData['status'] == "applied"){
      this.msgs = [];
      this.msgs.push({severity:'warn', summary:'Warn Message', detail:'You have already applied for this institute.Now you can not edit this institute details'});
    }else{

      this.confirmationService.confirm({
        message: 'Are you sure you want to save?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          event.confirm.resolve();
          this.api.updateInstituteData(event.newData['id'],event.newData['universityName'],event.newData['email'],event.newData['country'],event.newData['contactNumber'])
          .subscribe(data => {
            if(data['status'] == 200){
              this.msgs = [];
              this.msgs.push({severity:'success', summary:'Success Message', detail:'Institute data updated successfully'});
            }else if(data['status'] == 400){
              this.msgs = [];
              this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in updating data.Please try again!!!!!!'});
            }     
          });
        },
        reject: () => {
          event.confirm.reject();
        }
      });
    }
  }

  onDeleteConfirm(event): void {
    if(event['data']['status'] == "applied"){
      this.msgs = [];
      this.msgs.push({severity:'warn', summary:'Warn Message', detail:'You have already applied for this institute.Now you can not delete this institute record'});
    }else{
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          event.confirm.resolve();
          this.api.deleteInstituteData(event['data']['id'])
          .subscribe(data => {
            if(data['status'] == 200){
              this.msgs = [];
              this.msgs.push({severity:'success', summary:'Success Message', detail:'Institute data deleted successfully'});
            }else if(data['status'] == 400){
             this.msgs = [];
             this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in deleting data.Please try again!!!!!!'});
            }     
          });
        },
        reject: () => {
          event.confirm.reject();
        }
      });
    }
  }

  addToCart(){
    if(this.source != undefined){
      this.api.checkCart()
      .subscribe(data => {
        if(data['status'] == 200){
          this.router.navigateByUrl('/pages/cart');
        }else if(data['status'] == 400){
        }     
      });
    }else{
    }
  }

  ngOnInit() {
    this.profileInfo();
    this.educationalStep();
    this.userService.onUserChange()
    .subscribe((user: any) => {
        this.user = user;
        this.user_id = user['id'];
    });
    this.api.getEducationDetails().subscribe(data  =>{
      if(data['status'] == 200){
        this.pass_info = data['data']['user_data_value']
        this.ssc_info = data['data']['ssc'][0];
        this.fyjc_info = data['data']['fyjc'][0];
        this.hsc_info = data['data']['hsc'][0];
        this.degree_info = data['data']['degree'][0];
        this.master_info = data['data']['master'][0];
        this.phd_info =data['data']['phd'][0];
      }else{
      }
    });
    this.api.getDocumentStatus().subscribe(data =>{
      if(data['status'] == 200){
        this.transcript_completed = true;
      }else if(data['status'] == 400){
        this.transcript_completed = false;
      }
    });
    this.api.checkPayment().subscribe(
      data =>{
        if(data['status'] == 200){
          this.show_payment_button = false;
          this.payment_data = data['data'];
          this.application_id = data['application_id'];
        }else if(data['status'] == 400){
          this.show_payment_button = true;
        }
      }
    )
    this.api.getInstituteStatus().subscribe(data =>{
      if(data['status'] == 200){
        this.show_institution_card = true;
      }else if(data['status'] == 400){
        this.show_institution_card = false;
      }
    })
    this.api.getInstituteData()
      .subscribe(data => {
        if(data['status'] == 200){
          var ary = [];
          for(var f in data['data']){
            ary.push({
              "id" : data['data'][f]['id'],
              "universityName" : data['data'][f]['university_name'],
              "email" : data['data'][f]['email'],
              "country" : data['data'][f]['country_name'],
              "contactNumber" : data['data'][f]['contact_number'],
              "status" : data['data'][f]['status'],
            });
          }
          this.source =  ary;
        }else if(data['status'] == 400){
        }
    });

    this.api.getProfileValues().subscribe(data => {
      if (data['status'] == 200) {
          if(data['data']['profile']['applying_for'] == "Degree"){
            this.master_upload = true;
            this.phd_upload = true;
          }else if(data['data']['profile']['applying_for'] == "Masters"){
            this.master_upload = true;
            this.phd_upload = true;
          }else if(data['data']['profile']['applying_for'] == "Ph.D"){
            this.master_upload = false;
            this.phd_upload = true;
          }

          this.profile = data['data']['profile'];
          if(data['data']['profile']['dob'] == null || data['data']['profile']['dob'] == '' || data['data']['profile']['dob'] == undefined){
            this.firstdob = null;
          }else{
            this.firstdob = new Date(data['data']['profile']['dob']);
          }

          if(data['data']['profile']['country_id']==null || data['data']['profile']['country_id']=='' || data['data']['profile']['country_id']==undefined){
            this.permCountry = null;
          }else{
            this.permCountry = data['data']['profile']['country_id'];
          }

          //testradio
          if (this.profile.applying_for == "Degree") {
            this.testradio = "" + 1;
            this.Dropdownvar = 1;
          }else if(this.profile.applying_for == "Masters"){
            this.testradio = "" + 2;
            this.Dropdownvar = 2;
          }else if(this.profile.applying_for == "Ph.D"){
            this.testradio = "" + 3;
            this.Dropdownvar = 3;
          }
           
           this.mobile_country_code = data['data']['profile']['mobile_country_code'];
           this.Country_id_personal = data['data']['profile']['mobile_country_code'] ? data['data']['profile']['mobile_country_code'] : null;
       } else {}
   });
  }
  giveUSER_Id(){
    this.userService.onUserChange()
    .subscribe((user: any) => {
        this.user = user;
        this.user_id = user['id'];
    });
    return this.user_id;
  }

  private educationalStep() : void{
    this.educationalForm = this.fb.group({
      SIGNDocument: [null, Validators.required],

      ssc_Univ_name: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      ssc_SscName: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      ssc_InputMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      ssc_OutofMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      SSCDocument : [null, Validators.required],
      SSCPassingDocument: [null, Validators.required],

      fyjc_Univ_name:['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      fyjc_SscName: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      fyjc_InputMarks : ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      fyjc_OutofMarks : ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      FYJCDocument : [null, Validators.required],

      inputHscUniv_name: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      hsc_inputSchool: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      hsc_InputMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      hsc_OutofMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      HSCDocument : [null, Validators.required],
      HSCPassingDocument: [null, Validators.required],

      grad_UnivName: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      grad_inputSchool: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      grad_InputMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      grad_OutofMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      GraduationDocument : [null, Validators.required],
      DegreeCertificateDocument: [null, Validators.required],

      master_UnivName: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      master_InputSchool: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      master_InputMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      master_OutofMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      MasterDocument : [null, Validators.required],
      MasterCertificateDocument : [null, Validators.required],

      phd_UnivName: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      phd_InputSchool: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      phd_InputMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      phd_OutofMarks: ['', [Validators.pattern(this.marksValidate), Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      phdDocument : [null, Validators.required],

      CourseLetterDocument : [null, Validators.required],
      OfferLetterDocument : [null, Validators.required],

      passport_no_ctrl: ['', [Validators.pattern(this.passportValidate), Validators.required, Validators.maxLength(15)]],
      VisaDocument : [null, Validators.required],
      PassportDocument : [null, Validators.required],

    }
    );

    this.api.getApplyingEducation().subscribe(data => {
      this.applying_for = data['data']['applying_for'];
      if(this.applying_for == "Ph.D"){
        this.educationalForm.get('phd_UnivName').disable();
        this.educationalForm.get('phd_InputSchool').disable();
        this.educationalForm.get('phd_InputMarks').disable();
        this.educationalForm.get('phd_OutofMarks').disable();  
        this.educationalForm.get('phdDocument').disable();

      }else if(this.applying_for == "Masters"){ 
        this.educationalForm.get('phd_UnivName').disable();
        this.educationalForm.get('phd_InputSchool').disable();
        this.educationalForm.get('phd_InputMarks').disable();
        this.educationalForm.get('phd_OutofMarks').disable();  
        this.educationalForm.get('phdDocument').disable();

        this.educationalForm.get('master_UnivName').disable();
        this.educationalForm.get('master_InputSchool').disable();
        this.educationalForm.get('master_InputMarks').disable();
        this.educationalForm.get('master_OutofMarks').disable();  
        this.educationalForm.get('MasterDocument').disable(); 
        this.educationalForm.get('MasterCertificateDocument').disable();


      }else if(this.applying_for == "Degree"){
        this.educationalForm.get('grad_UnivName').disable();
        this.educationalForm.get('grad_inputSchool').disable();
        this.educationalForm.get('grad_InputMarks').disable();
        this.educationalForm.get('grad_OutofMarks').disable(); 
        this.educationalForm.get('GraduationDocument').disable();
        this.educationalForm.get('DegreeCertificateDocument').disable();

        this.educationalForm.get('phd_UnivName').disable();
        this.educationalForm.get('phd_InputSchool').disable();
        this.educationalForm.get('phd_InputMarks').disable();
        this.educationalForm.get('phd_OutofMarks').disable();  
        this.educationalForm.get('phdDocument').disable();

        this.educationalForm.get('master_UnivName').disable();
        this.educationalForm.get('master_InputSchool').disable();
        this.educationalForm.get('master_InputMarks').disable();
        this.educationalForm.get('master_OutofMarks').disable();  
        this.educationalForm.get('MasterDocument').disable(); 
        this.educationalForm.get('MasterCertificateDocument').disable();

        this.educationalForm.get('CourseLetterDocument').disable();
        this.educationalForm.get('OfferLetterDocument').disable();
      

      }else{ 
        this.educationalForm.get('grad_UnivName').disable();
        this.educationalForm.get('grad_inputSchool').disable();
        this.educationalForm.get('grad_InputMarks').disable();
        this.educationalForm.get('grad_OutofMarks').disable(); 
        this.educationalForm.get('GraduationDocument').disable();
        this.educationalForm.get('DegreeCertificateDocument').disable();

        this.educationalForm.get('master_UnivName').disable();
        this.educationalForm.get('master_InputSchool').disable();
        this.educationalForm.get('master_InputMarks').disable();
        this.educationalForm.get('master_OutofMarks').disable();  
        this.educationalForm.get('MasterDocument').disable();
        this.educationalForm.get('MasterCertificateDocument').disable();
        
        this.educationalForm.get('phd_UnivName').disable();
        this.educationalForm.get('phd_InputSchool').disable();
        this.educationalForm.get('phd_InputMarks').disable();
        this.educationalForm.get('phd_OutofMarks').disable();  
        this.educationalForm.get('phdDocument').disable();

        this.educationalForm.get('CourseLetterDocument').disable();
        this.educationalForm.get('OfferLetterDocument').disable();


      }
    });

    this.api.getDocumentDetails().subscribe(data =>{
      if(data['status'] == 200){
        this.moreDocs = data['moreDocs'];
        console.log("this.moreDocs======>"+JSON.stringify(this.moreDocs));

        if(data['data'][0]['sign_document_exists'] == 'exists'){
          this.sign_document = true;
          this.sign_lock=data['data'][0]['sign_lock']
          this.educationalForm.controls.SIGNDocument.patchValue(data['data'][0]['sign_document']);
        }

        if(data['data'][0]['ssc_document_exists'] == 'exists'){
          this.ssc_document = true;
          this.ssc_lock=data['data'][0]['ssc_lock']
          this.educationalForm.controls.SSCDocument.patchValue(data['data'][0]['ssc_document']);
        }
        if(data['data'][0]['ssc_passing_document_exists'] == 'exists'){
          this.ssc_passing_document = true;
          this.ssc_passing_lock=data['data'][0]['ssc_passing_lock']
          this.educationalForm.controls.SSCPassingDocument.patchValue(data['data'][0]['ssc_passing_document']);
        }
        if(data['data'][0]['fyjc_document_exists'] == 'exists'){
          this.fyjc_document = true;
          this.fyjc_lock=data['data'][0]['fyjc_lock']
          this.educationalForm.controls.FYJCDocument.patchValue(data['data'][0]['fyjc_document']);
        }
        if(data['data'][0]['hsc_document_exists'] == 'exists'){
          this.hsc_document = true;
          this.hsc_lock=data['data'][0]['hsc_lock']
          this.educationalForm.controls.HSCDocument.patchValue(data['data'][0]['hsc_document']);
        }
        if(data['data'][0]['hsc_passing_document_exists'] == 'exists'){
          this.hsc_passing_document = true;
          this.hsc_passing_lock=data['data'][0]['hsc_passing_lock']
          this.educationalForm.controls.HSCPassingDocument.patchValue(data['data'][0]['hsc_passing_document']);
        }
        if(data['data'][0]['degree_document_exists'] == 'exists'){
          this.degree_document = true;
          this.degree_lock=data['data'][0]['degree_lock']
          this.educationalForm.controls.GraduationDocument.patchValue(data['data'][0]['degree_document']);
        }
        if(data['data'][0]['degree_certificate_document_exists'] == 'exists'){
          this.degree_certificate_document = true;
          this.degree_certificate_lock=data['data'][0]['degree_certificate_lock']
          this.educationalForm.controls.DegreeCertificateDocument.patchValue(data['data'][0]['degree_certificate_document']);
        }
        if(data['data'][0]['master_document_exists'] == 'exists'){
          this.master_document = true;
          this.master_lock=data['data'][0]['master_lock']
          this.educationalForm.controls.MasterDocument.patchValue(data['data'][0]['master_document']);
        }
        if(data['data'][0]['master_certifiate_document_exists'] == 'exists'){
          this.master_certificate_document = true;
          this.master_certificate_lock = data['data'][0]['master_certificate_lock']
          this.educationalForm.controls.MasterCertificateDocument.patchValue(data['data'][0]['master_certificate_document']);
        }
        if(data['data'][0]['phd_document_exists'] == 'exists'){
          this.phd_document = true;
          this.phd_lock=data['data'][0]['phd_lock']
          this.educationalForm.controls.phdDocument.patchValue(data['data'][0]['phd_document']);
        }
        if(data['data'][0]['course_letter_document_exists'] == 'exists'){
          this.course_letter_document = true;
          this.course_letter_lock=data['data'][0]['course_letter_lock']
          this.educationalForm.controls.CourseLetterDocument.patchValue(data['data'][0]['course_letter_document']);
        }
        if(data['data'][0]['offer_letter_document_exists'] == 'exists'){
          this.offer_letter_document = true;
          this.offer_letter_lock=data['data'][0]['offer_letter_lock']
          this.educationalForm.controls.OfferLetterDocument.patchValue(data['data'][0]['offer_letter_document']);
        }
        
        if(data['data'][0]['passport_document_exists'] == 'exists'){
          this.passport_document = true;
          this.passport_lock=data['data'][0]['passport_lock']
          this.educationalForm.controls.PassportDocument.patchValue(data['data'][0]['passport_document']);
        }
        if(data['data'][0]['visa_document_exists'] == 'exists'){
          this.visa_document = true;
          this.visa_lock=data['data'][0]['visa_lock']
          this.educationalForm.controls.VisaDocument.patchValue(data['data'][0]['visa_document']);
        }
        
      }else{
      }
    });
  }

  private profileInfo(): void {
    this.profileForm = this.fb.group({
        profile_username: ['', [Validators.required,Validators.maxLength(70), Validators.minLength(3)]],
        profile_surname: ['', [Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
        genderCtrl: ['', [Validators.required]],
        dobCtrl: ['', [Validators.required]],
        emailCtrl: ['', [Validators.required]],
        //countryidCtrl: ['', [Validators.required]],
        phonecodeCtrl: ['', [Validators.required]],
        phoneCtrl: ['', [Validators.required, Validators.pattern(this.mobileValidate)]],
        permCountryCtrl: ['', [Validators.required]],
        permPostCodeCtrl: ['', [Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]],
        CityCtrl: [''],
        permAddCtrl: [''],
        user_OptionCtrl: ['', [Validators.required]],
        alterAddCtrl: [''],
        alterCityCtrl: [''],
        alterPostCodeCtrl: ['', [Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]],
    })
  } 

  onSubmit(){
    this.educationalForm.controls.ssc_Univ_name.markAsDirty();
    this.educationalForm.controls.ssc_SscName.markAsDirty();
    this.educationalForm.controls.ssc_InputMarks.markAsDirty();
    this.educationalForm.controls.ssc_OutofMarks.markAsDirty();

    this.educationalForm.controls.fyjc_Univ_name.markAsDirty();
    this.educationalForm.controls.fyjc_SscName.markAsDirty();
    this.educationalForm.controls.fyjc_InputMarks.markAsDirty();
    this.educationalForm.controls.fyjc_OutofMarks.markAsDirty();

    this.educationalForm.controls.inputHscUniv_name.markAsDirty();
    this.educationalForm.controls.hsc_inputSchool.markAsDirty();
    this.educationalForm.controls.hsc_InputMarks.markAsDirty();
    this.educationalForm.controls.hsc_OutofMarks.markAsDirty();

    this.educationalForm.controls.grad_UnivName.markAsDirty();
    this.educationalForm.controls.grad_inputSchool.markAsDirty();
    this.educationalForm.controls.grad_InputMarks.markAsDirty();
    this.educationalForm.controls.grad_OutofMarks.markAsDirty();

    this.educationalForm.controls.master_UnivName.markAsDirty();
    this.educationalForm.controls.master_InputSchool.markAsDirty();
    this.educationalForm.controls.master_InputMarks.markAsDirty();
    this.educationalForm.controls.master_OutofMarks.markAsDirty();

    this.educationalForm.controls.phd_UnivName.markAsDirty();
    this.educationalForm.controls.phd_InputSchool.markAsDirty();
    this.educationalForm.controls.phd_InputMarks.markAsDirty();
    this.educationalForm.controls.phd_OutofMarks.markAsDirty();

    this.inputSsc = ( < HTMLInputElement > document.getElementById('ssc_type')).value;
    this.inputFyjc = ( < HTMLInputElement > document.getElementById('fyjc_type')).value;
    this.inputHsc = ( < HTMLInputElement > document.getElementById('hsc_type')).value;
    this.inputGradValue = ( < HTMLInputElement > document.getElementById('grad_type')).value;
    this.inputMasterValue = ( < HTMLInputElement > document.getElementById('master_type')).value;
    this.inputphdValue = ( < HTMLInputElement > document.getElementById('phd_type')).value;

    this.form_submitted = true;
    if (this.educationalForm.valid) {
      var educationalValue = {
        sscUniversity: this.educationalForm.controls.ssc_Univ_name.value,
        ssc_SscName: this.educationalForm.controls.ssc_SscName.value,
        ssc_InputMarks: this.educationalForm.controls.ssc_InputMarks.value,
        ssc_OutofMarks: this.educationalForm.controls.ssc_OutofMarks.value,
        hiddenssc: this.inputSsc,

        fyjcUniversity: this.educationalForm.controls.fyjc_Univ_name.value,
        fyjc_inputSchool: this.educationalForm.controls.fyjc_SscName.value,
        fyjc_InputMarks: this.educationalForm.controls.fyjc_InputMarks.value,
        fyjc_OutofMarks: this.educationalForm.controls.fyjc_OutofMarks.value,
        hiddenfyjc: this.inputFyjc,
  
        inputHscUniv_name: this.educationalForm.controls.inputHscUniv_name.value,
        hsc_inputSchool: this.educationalForm.controls.hsc_inputSchool.value,
        hsc_InputMarks: this.educationalForm.controls.hsc_InputMarks.value,
        hsc_OutofMarks: this.educationalForm.controls.hsc_OutofMarks.value,
        hiddenHsc: this.inputHsc,
  
        grad_UnivName: this.educationalForm.controls.grad_UnivName.value,
        grad_inputSchool: this.educationalForm.controls.grad_inputSchool.value,
        grad_InputMarks: this.educationalForm.controls.grad_InputMarks.value,
        grad_OutofMarks: this.educationalForm.controls.grad_OutofMarks.value,
        hiddenGraduation: this.inputGradValue,
  
        master_UnivName: this.educationalForm.controls.master_UnivName.value,
        master_InputSchool: this.educationalForm.controls.master_InputSchool.value,
        master_InputMarks: this.educationalForm.controls.master_InputMarks.value,
        master_OutofMarks: this.educationalForm.controls.master_OutofMarks.value,
        hiddenMaster: this.inputMasterValue,

        phd_UnivName: this.educationalForm.controls.phd_UnivName.value,
        phd_InputSchool: this.educationalForm.controls.phd_InputSchool.value,
        phd_InputMarks: this.educationalForm.controls.phd_InputMarks.value,
        phd_OutofMarks: this.educationalForm.controls.phd_OutofMarks.value,
        hiddenphd: this.inputphdValue,

        passportnumber : this.educationalForm.controls.passport_no_ctrl.value,
      }


      this.api.setEducationDetails(educationalValue).subscribe((data: any) => {
        if(data['status'] == 200){
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'Success Message', detail:'Educational Details saved successfully!!!'});
          this.show_institution_card = true;
        }else if(data['status'] == 400){
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error Message', detail: data['message']+" Please Try again...."});
        }else{
         this.msgs = [];
         this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in saving data..Please Try again....'});
        }
      });
    }else{
      return;
    }
  }

  onSelect($event,value): void {
    var maxFileSize =  5000000;
		var imgArr = $event.files[0].name.split('.');
		var extension = imgArr[imgArr.length - 1].trim();
    if ($event.files[0].size > maxFileSize) {
			this.confirmationService.confirm({
				message: 'Maximum file size should be 5 MB.',
				header: 'Invalid File Size',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
        acceptLabel: 'Ok',
        accept: () => {

        },reject: () => {
          
        }
			});
		}

		if(value=='SIGN' && (extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='JPG' && extension!='JPEG' && extension!='PNG' ) ) {
			this.confirmationService.confirm({
				message: 'Please upload your transcript in .jpeg or .jpg or .png formats',
				header: 'Invalid File Type',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
				acceptLabel: 'Ok'
			});
		}

		if(value!='SIGN' && (extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf' && extension!='JPG' && extension!='JPEG' && extension!='PNG' && extension!='PDF' )){
			this.confirmationService.confirm({
				message: 'Please upload your transcript in .jpeg or .jpg or .png or .pdf formats',
				header: 'Invalid File Type',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
				acceptLabel: 'Ok'
			});
		}

  }

  onUpload(event: any) {
    const reader = new FileReader();
    var duration = 10000;
    this.index += 1;

    if (event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);
      var json = JSON.parse(event.xhr.response);
      var yourData = json.data; 
      var yourStatus = json.status; 
      var yourMessage = json.message;
      
      if (yourStatus == 200) {
        if(yourData == "SIGN"){
          this.sign_document = true;
          this.sign_lock = false;
          this.loadingsignbutton = false;
        }else if(yourData == "SSC"){
          this.ssc_document = true;
          this.ssc_lock = false;
          this.loadingsscbutton = false;
        }else if(yourData == "SSC_Passing"){
          this.ssc_passing_document = true;
          this.ssc_passing_lock = false;
          this.loadingsscpassingbutton = false;
        }else if(yourData == "FYJC"){
          this.fyjc_document = true;
          this.fyjc_lock = false;
          this.loadingfyjcbutton = false;
        }else if(yourData == "HSC"){
          this.hsc_document = true;
          this.hsc_lock = false;
          this.loadinghscbutton = false;
        }else if(yourData == "HSC_Passing"){
          this.hsc_passing_document = true;
          this.hsc_passing_lock = false;
          this.loadinghscpassingbutton = false;
        }else if(yourData == "Graduation"){
          this.degree_document = true;
          this.degree_lock=false;
          this.loadingdegreebutton = false;
        }else if(yourData == "Degree_Certificate"){
          this.degree_certificate_document = true;
          this.degree_certificate_lock=false;
          this.loadingdegreecertificatebutton= false;
        }else if(yourData == "Master"){
          this.master_document = true;
          this.master_lock =false;
          this.loadingmasterbutton = false;
        }else if(yourData == "Master_Certificate"){
          this.master_certificate_document = true;
          this.master_certificate_lock =false;
          this.loadingmastercertificatebutton = false;
        }else if(yourData == "Ph.D"){
          this.phd_document = true;
          this.phd_lock =false;
          this.loadingphdbutton = false;
        }else if(yourData == "Course_Letter"){
          this.course_letter_document = true;
          this.course_letter_lock =false;
          this.loadingcourseletterbutton = true;
        }else if(yourData == "Offer_Letter"){
          this.offer_letter_document = true;
          this.offer_letter_lock =false;
          this.loadingofferletterbutton = true;
        }else if(yourData == "Passport"){
          this.passport_document = true;
          this.passport_lock =false;
          this.loadingpassportbutton = true;
        }else if(yourData == "Visa"){
          this.visa_document = true;
          this.visa_lock =false;
          this.loadingvisabutton = true;
        }

        this.messageService.add({severity:'success', summary: 'Success Message', detail : yourMessage});
      } else if (yourStatus == 401) {
        this.messageService.add({severity:'error', summary: 'Error Message', detail: yourMessage});
      } else if (yourStatus == 400) {
        this.messageService.add({severity:'error', summary: 'Error Message', detail: yourMessage});
      }

      this.api.getDocumentStatus().subscribe(data =>{
        if(data['status'] == 200){
          this.transcript_completed = true;
        }else if(data['status'] == 400){
          this.transcript_completed = false;
        }
      });
    }
  }

  onErrorFileUpload(event: any) {
    let msg: string = " ";
    msg += "Error: File NOT Uploaded. (" + event.files[0].name + ").  ";
    var duration = 10000;
    if (event.xhr.response == "") {
      this.messageService.add({severity:'error', summary: 'Error Message', detail: 'Network Error. Please try again after some time.'});
    }
  }

  onBeforeSend(event,value) {
    if(value == "SIGN"){
      this.loadingsignbutton = true;
    }else if(value == "SSC"){
      this.loadingsscbutton = true;
    }else if(value == "SSC_Passing"){
      this.loadingsscpassingbutton = true;
    }else if(value == "FYJC"){
      this.loadingfyjcbutton = true;
    }else if(value == "HSC"){
      this.loadinghscbutton = true;
    }else if(value == "HSC_Passing"){
      this.loadinghscpassingbutton = false;
    }else if(value == "Graduation"){
      this.loadingdegreebutton = true;
    }else if(value == "Degree_Certificate"){
      this.loadingdegreecertificatebutton= true;
    }else if(value == "Master"){
      this.loadingmasterbutton = true;
    }else if(value == "Master_Certificate"){
      this.loadingmastercertificatebutton = true;
    }else if(value == "Ph.D"){
      this.loadingphdbutton = true;
    }else if(value == "Course_Letter"){
      this.loadingcourseletterbutton = true;
    }else if(value == "Offer_Letter"){
      this.loadingofferletterbutton = true;
    }else if(value == "Passport"){
      this.loadingpassportbutton = true;
    }else if(value == "Visa"){
      this.loadingvisabutton = true;
    }
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.currenttoken = token;
        event.xhr.setRequestHeader("Authorization", `Bearer ` + this.currenttoken);
      }
    });
  }

  downloadDoc(type,value){
    value = value.split('/').pop();
console.log("value=========>"+value);
    this.api.downloadFiles(value)
    .subscribe(data => {
      saveAs(data, value);
    });
  }

  checkmarks(type){
    if(type == 'SSC'){
      if(+this.educationalForm.controls.ssc_InputMarks.value > +this.educationalForm.controls.ssc_OutofMarks.value){
        this.educationalForm.controls['ssc_OutofMarks'].setErrors({'incorrect': true});
        this.educationalForm.controls.ssc_OutofMarks.markAsDirty();
      }else{
        this.educationalForm.controls['ssc_OutofMarks'].setErrors({'incorrect': null});
        this.educationalForm.controls['ssc_OutofMarks'].clearValidators();
        this.educationalForm.controls['ssc_OutofMarks'].updateValueAndValidity();
      }
    }else if(type == 'FYJC'){ 
      if(+this.educationalForm.controls.fyjc_InputMarks.value > +this.educationalForm.controls.fyjc_OutofMarks.value){
        this.educationalForm.controls['fyjc_OutofMarks'].setErrors({'incorrect': true});
        this.educationalForm.controls.fyjc_OutofMarks.markAsDirty();
      }else{
        this.educationalForm.controls['fyjc_OutofMarks'].setErrors({'incorrect': null});
        this.educationalForm.controls['fyjc_OutofMarks'].clearValidators();
        this.educationalForm.controls['fyjc_OutofMarks'].updateValueAndValidity();
      }
    }else if(type == 'HSC'){
      if(+this.educationalForm.controls.hsc_InputMarks.value > +this.educationalForm.controls.hsc_OutofMarks.value){
        this.educationalForm.controls['hsc_OutofMarks'].setErrors({'inhsccorrect': true});
        this.educationalForm.controls.hsc_OutofMarks.markAsDirty();
      }else{
        this.educationalForm.controls['hsc_OutofMarks'].setErrors({'inhsccorrect': null});
        this.educationalForm.controls['hsc_OutofMarks'].clearValidators();
        this.educationalForm.controls['hsc_OutofMarks'].updateValueAndValidity();
      }
    }else if(type == 'Graduation'){
      if(+this.educationalForm.controls.grad_InputMarks.value > +this.educationalForm.controls.grad_OutofMarks.value){
        this.educationalForm.controls['grad_OutofMarks'].setErrors({'incorrect': true});
        this.educationalForm.controls.grad_OutofMarks.markAsDirty();
      }else{
        this.educationalForm.controls['grad_OutofMarks'].setErrors({'incorrect': null});
        this.educationalForm.controls['grad_OutofMarks'].clearValidators();
        this.educationalForm.controls['grad_OutofMarks'].updateValueAndValidity();
      }
    }else if(type == 'Master'){
      if(+this.educationalForm.controls.master_InputMarks.value > +this.educationalForm.controls.master_OutofMarks.value){
        this.educationalForm.controls['master_OutofMarks'].setErrors({'incorrect': true});
        this.educationalForm.controls.master_OutofMarks.markAsDirty();
      }else{
        this.educationalForm.controls['master_OutofMarks'].setErrors({'incorrect': null});
        this.educationalForm.controls['master_OutofMarks'].clearValidators();
        this.educationalForm.controls['master_OutofMarks'].updateValueAndValidity();
      }
    }
    else if(type == 'Ph.D'){
      if(+this.educationalForm.controls.phd_InputMarks.value > +this.educationalForm.controls.phd_OutofMarks.value){
        this.educationalForm.controls['phd_OutofMarks'].setErrors({'incorrect': true});
        this.educationalForm.controls.phd_OutofMarks.markAsDirty();
      }else{
        this.educationalForm.controls['phd_OutofMarks'].setErrors({'incorrect': null});
        this.educationalForm.controls['phd_OutofMarks'].clearValidators();
        this.educationalForm.controls['phd_OutofMarks'].updateValueAndValidity();
      }
    }
  }

  selectStep(){
    if(this.stepper.selectedIndex == 2){
      if(this.source != undefined){
        this.api.checkCart()
        .subscribe(data => {
          if(data['status'] == 200){
            this.router.navigateByUrl('/pages/cart');
          }else if(data['status'] == 400){
           this.stepper.selectedIndex = 0;
          }     
        });
      }else{
        this.stepper.selectedIndex = 0;
      }
    }
  }

  onValueChange_PhoneCode(event) {
    var phonecode;
    var permittedValues = this.Countries.map(function (value) {
        if (value.id == event) {
            phonecode = value.phonecode;
        }
    });
    if (!(phonecode == null || phonecode == undefined)) {
        this.mobile_country_code = phonecode;
    }
  }

  onFirstSubmit() {
      this.show_address_message = false;
      this.programDataerror = false;
      this.profileForm.controls.profile_username.markAsDirty();
      this.profileForm.controls.profile_surname.markAsDirty();
      this.profileForm.controls.genderCtrl.markAsDirty();
      this.profileForm.controls.dobCtrl.markAsDirty();
      //this.profileForm.controls.countryidCtrl.markAsDirty();
      this.profileForm.controls.phonecodeCtrl.markAsDirty();
      this.profileForm.controls.phoneCtrl.markAsDirty();
      //this.profileForm.controls.permPostCodeCtrl.markAsDirty();


      if(this.profileForm.controls.permAddCtrl.value =='' || this.profileForm.controls.alterAddCtrl.value =='' || 
        this.profileForm.controls.permAddCtrl.value ==null || this.profileForm.controls.permAddCtrl.value ==undefined ||
        this.profileForm.controls.alterAddCtrl.value ==null || this.profileForm.controls.alterAddCtrl.value ==undefined){
        this.show_address_message = true;
        this.address_message = "Please Fill One of above address."
        this.profileForm.controls['permAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
        this.profileForm.controls['permAddCtrl'].updateValueAndValidity(); 
        this.profileForm.controls['alterAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
        this.profileForm.controls['alterAddCtrl'].updateValueAndValidity(); 
        this.profileForm.controls.permAddCtrl.markAsDirty();
        this.profileForm.controls.alterAddCtrl.markAsDirty();
      }


      if(this.profileForm.controls.permAddCtrl.value !='' && this.profileForm.controls.permAddCtrl.value !=null && this.profileForm.controls.permAddCtrl.value !=undefined){
        this.show_address_message = false;
        if(this.profileForm.controls.CityCtrl.value =='' || this.profileForm.controls.CityCtrl.value ==null || 
          this.profileForm.controls.CityCtrl.value == undefined || this.profileForm.controls.permPostCodeCtrl.value =='' ||
          this.profileForm.controls.permPostCodeCtrl.value ==null || this.profileForm.controls.permPostCodeCtrl.value ==undefined){
            this.profileForm.controls['CityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
            this.profileForm.controls['CityCtrl'].updateValueAndValidity(); 
            this.profileForm.controls['permPostCodeCtrl'].setValidators([Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]); 
            this.profileForm.controls['permPostCodeCtrl'].updateValueAndValidity(); 
            this.profileForm.controls.CityCtrl.markAsDirty();
            this.profileForm.controls.permPostCodeCtrl.markAsDirty();
            if( (this.profileForm.controls.alterAddCtrl.value!=null && this.profileForm.controls.alterAddCtrl.value!='' && this.profileForm.controls.alterAddCtrl.value!=undefined)
            || (this.profileForm.controls.alterCityCtrl.value != '' &&  this.profileForm.controls.alterCityCtrl.value != null &&  this.profileForm.controls.alterCityCtrl.value != undefined) ||
            (this.profileForm.controls.alterPostCodeCtrl.value != null && this.profileForm.controls.alterPostCodeCtrl.value != '' && this.profileForm.controls.alterPostCodeCtrl.value != undefined) ){
              this.profileForm.controls['alterAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['alterAddCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['alterCityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['alterCityCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['alterPostCodeCtrl'].setValidators([Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]); 
              this.profileForm.controls['alterPostCodeCtrl'].updateValueAndValidity();
              this.profileForm.controls.alterAddCtrl.markAsDirty();
              this.profileForm.controls.alterCityCtrl.markAsDirty();
              this.profileForm.controls.alterPostCodeCtrl.markAsDirty();
            }else{
              this.profileForm.controls['alterPostCodeCtrl'].setValidators([]); 
              this.profileForm.controls['alterPostCodeCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['alterAddCtrl'].setValidators([]); 
              this.profileForm.controls['alterAddCtrl'].updateValueAndValidity();
              this.profileForm.controls['alterCityCtrl'].setValidators([]); 
              this.profileForm.controls['alterCityCtrl'].updateValueAndValidity(); 
            }
          }else{
            if( (this.profileForm.controls.alterAddCtrl.value!=null && this.profileForm.controls.alterAddCtrl.value!='' && this.profileForm.controls.alterAddCtrl.value!=undefined)
            || (this.profileForm.controls.alterCityCtrl.value != '' &&  this.profileForm.controls.alterCityCtrl.value != null &&  this.profileForm.controls.alterCityCtrl.value != undefined) ||
            (this.profileForm.controls.alterPostCodeCtrl.value != null && this.profileForm.controls.alterPostCodeCtrl.value != '' && this.profileForm.controls.alterPostCodeCtrl.value != undefined) ){
              this.profileForm.controls['alterAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['alterAddCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['alterCityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['alterCityCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['alterPostCodeCtrl'].setValidators([Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]); 
              this.profileForm.controls['alterPostCodeCtrl'].updateValueAndValidity();
              this.profileForm.controls.alterAddCtrl.markAsDirty();
              this.profileForm.controls.alterCityCtrl.markAsDirty();
              this.profileForm.controls.alterPostCodeCtrl.markAsDirty();
            }else{
              this.profileForm.controls['alterPostCodeCtrl'].setValidators([]); 
              this.profileForm.controls['alterPostCodeCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['alterAddCtrl'].setValidators([]); 
              this.profileForm.controls['alterAddCtrl'].updateValueAndValidity();
              this.profileForm.controls['alterCityCtrl'].setValidators([]); 
              this.profileForm.controls['alterCityCtrl'].updateValueAndValidity(); 
            }
          }
      }
      
      if(this.profileForm.controls.alterAddCtrl.value !='' && this.profileForm.controls.alterAddCtrl.value !=null && this.profileForm.controls.alterAddCtrl.value !=undefined){
        this.show_address_message = false;
        if(this.profileForm.controls.alterCityCtrl.value =='' || this.profileForm.controls.alterCityCtrl.value ==null || 
          this.profileForm.controls.alterCityCtrl.value == undefined || this.profileForm.controls.alterPostCodeCtrl.value =='' ||
          this.profileForm.controls.alterPostCodeCtrl.value ==null || this.profileForm.controls.alterPostCodeCtrl.value ==undefined){
            this.profileForm.controls['alterCityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
            this.profileForm.controls['alterCityCtrl'].updateValueAndValidity(); 
            this.profileForm.controls['alterPostCodeCtrl'].setValidators([Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]); 
            this.profileForm.controls['alterPostCodeCtrl'].updateValueAndValidity(); 
            this.profileForm.controls.alterCityCtrl.markAsDirty();
            this.profileForm.controls.alterPostCodeCtrl.markAsDirty();
            if( (this.profileForm.controls.permAddCtrl.value!=null && this.profileForm.controls.permAddCtrl.value!='' && this.profileForm.controls.permAddCtrl.value!=undefined )
            || (this.profileForm.controls.CityCtrl.value != '' &&  this.profileForm.controls.CityCtrl.value != null &&  this.profileForm.controls.CityCtrl.value != undefined ) ||
            ( this.profileForm.controls.permPostCodeCtrl.value != null && this.profileForm.controls.permPostCodeCtrl.value != '' && this.profileForm.controls.permPostCodeCtrl.value != undefined )){
              this.profileForm.controls['permAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['permAddCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['CityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['CityCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['permPostCodeCtrl'].setValidators([Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]); 
              this.profileForm.controls['permPostCodeCtrl'].updateValueAndValidity();
              this.profileForm.controls.permAddCtrl.markAsDirty();
              this.profileForm.controls.CityCtrl.markAsDirty();
              this.profileForm.controls.permPostCodeCtrl.markAsDirty();
            }else{
              this.profileForm.controls['permPostCodeCtrl'].setValidators([]); 
              this.profileForm.controls['permPostCodeCtrl'].updateValueAndValidity();
              this.profileForm.controls['permAddCtrl'].setValidators([]); 
              this.profileForm.controls['permAddCtrl'].updateValueAndValidity();
              this.profileForm.controls['CityCtrl'].setValidators([]); 
              this.profileForm.controls['CityCtrl'].updateValueAndValidity(); 
            }
          }else{
            if( (this.profileForm.controls.permAddCtrl.value!=null && this.profileForm.controls.permAddCtrl.value!='' && this.profileForm.controls.permAddCtrl.value!=undefined )
            || (this.profileForm.controls.CityCtrl.value != '' &&  this.profileForm.controls.CityCtrl.value != null &&  this.profileForm.controls.CityCtrl.value != undefined ) ||
            ( this.profileForm.controls.permPostCodeCtrl.value != null && this.profileForm.controls.permPostCodeCtrl.value != '' && this.profileForm.controls.permPostCodeCtrl.value != undefined )){
              this.profileForm.controls['permAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['permAddCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['CityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
              this.profileForm.controls['CityCtrl'].updateValueAndValidity(); 
              this.profileForm.controls['permPostCodeCtrl'].setValidators([Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]); 
              this.profileForm.controls['permPostCodeCtrl'].updateValueAndValidity();
              this.profileForm.controls.permAddCtrl.markAsDirty();
              this.profileForm.controls.CityCtrl.markAsDirty();
              this.profileForm.controls.permPostCodeCtrl.markAsDirty();
            }else{
              this.profileForm.controls['permPostCodeCtrl'].setValidators([]); 
              this.profileForm.controls['permPostCodeCtrl'].updateValueAndValidity();
              this.profileForm.controls['permAddCtrl'].setValidators([]); 
              this.profileForm.controls['permAddCtrl'].updateValueAndValidity();
              this.profileForm.controls['CityCtrl'].setValidators([]); 
              this.profileForm.controls['CityCtrl'].updateValueAndValidity(); 
            }
          }
      }

      if (this.profileForm.controls.permCountryCtrl.value === null || this.profileForm.controls.permCountryCtrl.value === '' || this.profileForm.controls.permCountryCtrl.value === undefined) {
        this.permcountryValidation = false;
      } else {
        this.permcountryValidation = true;
      }

      if (this.testradio == '1') {
        this.program_value = 'Degree'
      }else if (this.testradio == '2') {
        this.program_value = 'Masters'
      }else if (this.testradio == '3') {
        this.program_value = 'Ph.D'
      }

      if(this.profileForm.controls.user_OptionCtrl.value=='' || this.profileForm.controls.user_OptionCtrl.value==undefined || this.profileForm.controls.user_OptionCtrl.value==null){
        this.programDataerror = true;
        this.program_error_message = "Please Select the Field";
      }

      const invalid = [];
      const controls = this.profileForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
      }
      //console.log("invalid========>"+invalid)
      

     this.form_submitted = true;
     if (this.profileForm.valid) {
      this.show_address_message = false;

      var profile = {
        username: this.profileForm.controls.profile_username.value,
        surname: this.profileForm.controls.profile_surname.value,
        gender: this.profileForm.controls.genderCtrl.value,
        dob: this.profileForm.controls.dobCtrl.value,
        phone_code: this.profileForm.controls.phonecodeCtrl.value,
        phone: this.profileForm.controls.phoneCtrl.value,
        address: this.profileForm.controls.permAddCtrl.value,
        city: this.profileForm.controls.CityCtrl.value,
        postal_code: this.profileForm.controls.permPostCodeCtrl.value,
        altaddress: this.profileForm.controls.alterAddCtrl.value,
        altcity: this.profileForm.controls.alterCityCtrl.value,
        altpostal_code: this.profileForm.controls.alterPostCodeCtrl.value,
        program : this.program_value,
        country: this.profileForm.controls.permCountryCtrl.value,
       }
       this.api.updateProfileValues(profile).subscribe(data => {
      });
     }else{
       console.error("form is not valid")
     }
   }

  checkradio(x) {
    this.Dropdownvar = x;
    if (this.Dropdownvar == '1') {
      this.testradio = '1';
    }else if (this.Dropdownvar == '2') {
      this.testradio = '2';
    }else if (this.Dropdownvar == '3') {
      this.testradio = '3';
    }
  }

  previewLetter(){
    this.loading = true;
    this.api.previewLetter()
      .subscribe(
        (data: any) => {
          if(data['status'] == 200){
            this.downloadTranscript(data.data);
            this.loading = false;
            alert('Downloading.....')
          }else if(data['status'] == 400){
            this.loading = false;
            alert(data['message']);
          }
          err => console.error(err)
        });
  }

  downloadTranscript(file_name) {
    var splitname = file_name.split('.');
    if (splitname[0] == 'http://93') {
      var pdfname = file_name.split('/');
      this.api.downloadFiles(pdfname[6])
        .subscribe(data => {
          
          saveAs(data, pdfname[6]);
        });
    } else {
      this.api.downloadFiles(file_name)
        .subscribe(data => {
          saveAs(data, file_name);
        });
    }
  }

  proceedForPayment(){
    this.dialogService.open(paymentOptionsDialog, {
			context: {
				
			},
		}).onClose
		.subscribe(
			(data: any) => {
				
			}
		)
  }

  async downloadReceipt(transaction_id,amount,order_status,application_id,payment_date_time,user_id){
    var generatereceipt = await this.api.OnlinePaymentChallan(transaction_id,amount,order_status,application_id,payment_date_time,user_id);
    generatereceipt.subscribe(
      data => {
        var value = data['data'].split('/').pop();
        this.api.downloadFiles(value)
          .subscribe(data => {
            saveAs(data, value);
          });
      },
      error => {
          console.error("Error", error);
      }
    ); 
  }

  open(EducationalDialogNo) {
    if (EducationalDialogNo == 1) {
      this.dialogService.open(TranscriptDialogComponent).onClose
        .subscribe(
          (data: any) => {
            if (data !== undefined) {
              this.moreTranscript();
            }
            err => console.error(err)
          })
    } else {
      console.error("Function Open () : invalid number ");
    }
  }

  moreTranscript(){
    this.api.getDocumentDetails().subscribe(data =>{
      if(data['status'] == 200){
        this.moreDocs = data['moreDocs'];
        //console.log("this.moreDocs======>"+JSON.stringify(this.moreDocs));
      }else{
      }
    });

  }
}

