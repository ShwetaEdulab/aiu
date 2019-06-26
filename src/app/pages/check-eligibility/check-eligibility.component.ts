import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators, FormControl, } from '@angular/forms';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'ngx-check-eligibility',
  templateUrl: './check-eligibility.component.html',
  styleUrls: ['./check-eligibility.component.scss']
})
export class CheckEligibilityComponent implements OnInit {
  checkEligibility : FormGroup;
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
  constructor(private fb: FormBuilder,private api: ApiService) { 

  }

  ngOnInit() {
    this.loading = true;
    this.checkEligibility = this.fb.group({
      countryNameCtrl : ['', Validators.required],
      universityNameCtrl : ['', Validators.required],
      collegeNameCtrl : ['', Validators.required]
    });
    this.api.getCountryDetails()
    .subscribe(data =>{
      this.loading = false;
      this.Countries = data['data'];
    });
  }

  getUniversities(event){
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
    this.college_Name  = event;
  }

  check(){
    this.AIU = false;
    this.MU = false;
    this.NotEligible = false;
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
