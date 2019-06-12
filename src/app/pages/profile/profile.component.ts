import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';

import {
  CountriesService
} from '../../@core/data/countries.service';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedGender : any;
  max : any;
  date : any;
  profile :any = {};
  Countries: any[];
  firstdob: any;
  mobile_country_code: any;
  Country_id_personal: any;
  form_submitted: boolean;
  readonly mobileValidate = /^[0-9]\d{5,12}$/;
  readonly charValidate = /^[.a-zA-Z ]*$/;
  readonly postalValidate = /^[a-zA-Z0-9 ]+$/;

  constructor(
      private fb: FormBuilder,
      protected api: ApiService,
      protected dateService: NbDateService < Date > ,
      protected countries: CountriesService,
  ) {
      this.Countries = this.countries.getData();
  }

  ngOnInit() {
      this.profileInfo();

      this.api.getProfileValues().subscribe(data => {
         if (data['status'] == 200) {
              this.profile = data['data']['profile'];
              this.firstdob = new Date(data['data']['profile']['dob']);
              this.mobile_country_code = data['data']['profile']['mobile_country_code'];
              this.Country_id_personal = data['data']['profile']['country_id'];
          } else {}
      });
  }

  private profileInfo(): void {
      this.profileForm = this.fb.group({
          profile_username: ['', [Validators.required,Validators.maxLength(70), Validators.minLength(3)]],
          profile_surname: ['', [Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
          genderCtrl: ['', [Validators.required]],
          dobCtrl: ['', [Validators.required]],
          emailCtrl: ['', [Validators.required]],
          countryidCtrl: ['', [Validators.required]],
          phonecodeCtrl: ['', [Validators.required]],
          phoneCtrl: ['', [Validators.required, Validators.pattern(this.mobileValidate)]],
          permPostCodeCtrl: ['', [Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]],
           CityCtrl: [''],
           user_OptionCtrl: [''],
           
          permAddCtrl: [''],
      })
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

  update() {
     this.profileForm.controls.profile_username.markAsDirty();
       this.profileForm.controls.profile_surname.markAsDirty();
       this.profileForm.controls.genderCtrl.markAsDirty();
       this.profileForm.controls.dobCtrl.markAsDirty();
       this.profileForm.controls.countryidCtrl.markAsDirty();
       this.profileForm.controls.phonecodeCtrl.markAsDirty();
       this.profileForm.controls.phoneCtrl.markAsDirty();
       this.profileForm.controls.permPostCodeCtrl.markAsDirty();

      this.form_submitted = true;
      this.profileForm.valid
      if (this.profileForm.valid) {
        var profile = {
          username: this.profileForm.controls.profile_username.value,
          surname: this.profileForm.controls.profile_surname.value,
          gender: this.profileForm.controls.genderCtrl.value,
          dob: this.profileForm.controls.dobCtrl.value,
          country: this.profileForm.controls.countryidCtrl.value,
          phone_code: this.profileForm.controls.phonecodeCtrl.value,
          phone: this.profileForm.controls.phoneCtrl.value,
          postal_code: this.profileForm.controls.permPostCodeCtrl.value,
          city: this.profileForm.controls.CityCtrl.value,
          address: this.profileForm.controls.permAddCtrl.value
        }
        this.api.updateProfileValues(profile).subscribe(data => {
      });
      }else{
        console.error("form is not valid")
      }


      
  }
}
