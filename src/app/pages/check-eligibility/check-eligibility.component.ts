import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators, FormControl, } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

@Component({
  selector: 'ngx-check-eligibility',
  templateUrl: './check-eligibility.component.html',
  styleUrls: ['./check-eligibility.component.scss']
})
export class CheckEligibilityComponent implements OnInit {
  checkEligibility : FormGroup;
  insertEligibilityData : FormGroup;
  loading = false;
  Countries : any;
  Universities: any;
  country_Name: any;
  countryName: any;
  university_Name: any;
  universityName: any;
  Colleges: any;
  collegeName: any;
  college_Name : any;
  finalData: any;
  AIU = false;
  MU = false;
  NotEligible = false;
  showError = false;
  showSaveError = false;
  successAlert = false;
  dangerAlert = false;
  constructor(private fb: FormBuilder,private api: ApiService) { 

  }

  ngOnInit() {
    this.loading = true;
    this.checkEligibility = this.fb.group({
      countryNameCtrl : ['', Validators.required],
      universityNameCtrl : ['', Validators.required],
      collegeNameCtrl : ['', Validators.required]
    });
    this.insertEligibilityData = this.fb.group({
      saveCountryCtrl : ['', Validators.required],
      saveUniversityCtrl : ['', Validators.required],
      saveCollegeCtrl : ['',Validators.required]
    });
    this.api.getCountryDetails()
    .subscribe(data =>{
      this.loading = false;
      this.Countries = data['data'];
    });
  }

  tab(event){
    var index = event.index;
    if(index == 0){
      this.loading = true;
      this.api.getCountryDetails()
      .subscribe(data =>{
        this.loading = false;
        this.Countries = data['data'];
      });
    } if(index == 1){

    }
  }

  getUniversities(event){
    this.showError = false;
    this.AIU = false;
    this.MU = false;
    this.NotEligible = false;
    this.loading = true;
    this.collegeName = undefined;
    this.country_Name  = event;
    this.api.getAllUniversities(this.country_Name)
    .subscribe(data =>{
      this.Universities = data['data'];
      this.loading = false;
    });
  }

  getColleges(event){
    this.showError = false;
    this.AIU = false;
    this.MU = false;
    this.NotEligible = false;
    this.loading = true;
    this.university_Name  = event;
    this.api.getCollegeName(this.country_Name,this.university_Name)
    .subscribe(data =>{
      this.Colleges = data['data'];
      this.loading = false;
    });
  }

  selectedCollege(event){
    this.showError = false;
    this.college_Name  = event;
  }

  check(){
    this.AIU = false;
    this.MU = false;
    this.NotEligible = false;
    this.loading = true;
    this.showError = false;
    if(this.checkEligibility.invalid){
      this.loading = false;
      this.showError = true;
    }else{
      this.api.checkEligibility(this.country_Name,this.university_Name,this.college_Name)
      .subscribe(data =>{
        if(data['status'] == 200){
          if(data['type'] == 'AIU'){
            this.AIU = true;
          }else if(data['type'] == 'MU'){
            this.MU = true;
            this.finalData = data['data'];
          }
      }else if(data['status'] == 400){
        console.log('not eligible');
        this.NotEligible = true;
      }
      this.loading = false;
      });
    }
  }

  saveCountryChange(event){
    this.showSaveError = false;
    this.successAlert = false;
    this.dangerAlert = false;
    this.insertEligibilityData.patchValue( {'saveUniversityCtrl':null} )
    this.insertEligibilityData.patchValue( {'saveCollegeCtrl':null} )
  }

  saveEligibilityData(){
    this.loading = true;
    this.successAlert = false;
    this.dangerAlert = false;
    if(this.insertEligibilityData.invalid){
      this.loading = false;
      this.showSaveError = true;
    }else{
      this.showSaveError = false;
      var country = this.insertEligibilityData.controls.saveCountryCtrl.value;
      var uni = this.insertEligibilityData.controls.saveUniversityCtrl.value;
      var clg = this.insertEligibilityData.controls.saveCollegeCtrl.value;
      this.api.saveEligibilityData(country,uni,clg)
      .subscribe( data =>{
        if(data['status'] == 200){
          console.log('success alert');
          this.successAlert = true;
        }else{
          console.log('eiror alert');
          this.dangerAlert = true;
        }
      });
      this.loading = false;
    }
  }
}
