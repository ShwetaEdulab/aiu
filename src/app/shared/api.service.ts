import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject, Subscriber} from 'rxjs/Rx';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { config } from '../../../config';
import { applicationApi } from '../model/applicationApi';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = config.serverUrl;
  constructor(private httpClient : HttpClient,
    public authService : NbAuthService,
    public themeService : NbThemeService) { }

    get(url: string): Observable<any> {
      return new Observable((observer: Subscriber<any>) => {
          let objectUrl: string = null;
          this.httpClient
              .get(url, {
                  responseType: 'blob'
              })
              .subscribe(m => {
                  objectUrl = URL.createObjectURL(m);
                  observer.next(objectUrl);
              });
  
          return () => {
              if (objectUrl) {
                  URL.revokeObjectURL(objectUrl);
                  objectUrl = null;
              }
          };
      });
  }

    login(email,password){
      try{
        return this.httpClient.post(`${this.baseUrl}/api/auth/login`,{"email":email,"password":password});
      }catch(error) {
        this.handleError("login from api : "+error);
      }
    }


    RegisterValues(data)
    {
      try{
          return this.httpClient.post(`${this.baseUrl}/api/auth/register`,{data : data});
      }catch(error){
        this.handleError('register errors')
      }
    }
    ForgotPassword(email)
    {
      try{
          // return this.httpClient.post(`${this.baseUrl}/api/auth/register`,{data : data});
          return  this.httpClient.post(`${this.baseUrl}/api/auth/forgot-password`,{
                     data : email});
      }catch(error){
        this.handleError('register errors')
      }
    }

    resetPasswordValues(data){  
      try{  
        
            return  this.httpClient.post(`${this.baseUrl}/api/auth/resetpassword`,{
              data : data
            }); 
      }catch(error){
        this.handleError("resetPasswordValues: "+JSON.stringify(error));
      }
    }

    Otpvalue(data){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/auth/verify-otp-reg`,{
         data : data
      });
  }catch(error) {
    this.handleError("Otpvalue : "+JSON.stringify(error));
  }
  }

  UpdateNumberOTP(data){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/login/resend-otp`,{
         data : data
      });
  }catch(error) {
    this.handleError("UpdateNumberOTP : "+JSON.stringify(error));
  }
  }

  confirmPass(email,pass){
          try{
            return this.httpClient.post(`${this.baseUrl}/mobile/user/confirm_api_password`,{"email":email,"pass":pass});
          }catch(error) {
            this.handleError("confirmPass : "+error);
          }
        }

          getCaptcha(){
    try{
        return  this.httpClient.get(`${this.baseUrl}/api/auth/captcha`);
            
    }catch(error) {
      this.handleError("getCaptcha: "+JSON.stringify(error));
    }
    
  }

//created by namrata

createInstitute(universityName,email,country,contactNumber){
  try{
    return  this.httpClient.post(`${this.baseUrl}/api/attestation/createInstitute`,{"universityName":universityName,"email":email,"country":country,"contactNumber":contactNumber});     
  }catch(error){
    this.handleError('createInstitute: ' + JSON.stringify(error));
  }
}

updateInstituteData(id,universityName,email,country,contactNumber){
  try{
    return  this.httpClient.post(`${this.baseUrl}/api/attestation/updateInstituteData`,{"id":id,"universityName":universityName,"email":email,"country":country,"contactNumber":contactNumber});     
  }catch(error){
    this.handleError('updateInstituteData: ' + JSON.stringify(error));
  }
}

deleteInstituteData(id){
  try{
    return  this.httpClient.post(`${this.baseUrl}/api/attestation/deleteInstituteData`,{"id":id});     
  }catch(error){
    this.handleError('deleteInstituteData: ' + JSON.stringify(error));
  }
}

getInstituteData(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/getInstituteData`); 
  }catch(error){
    this.handleError('getInstituteData: ' + JSON.stringify(error));
  }
}

addToCart(){
  try{
    return  this.httpClient.get(`${this.baseUrl}/api/attestation/addToCart`);
  }catch(error){
    this.handleError('addToCart: ' + JSON.stringify(error));
  }
}

getCartData(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/getCartData`); 
  }catch(error){
    this.handleError('getCartData: ' + JSON.stringify(error));
  }
}

getUserData(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/getUserData`); 
  }catch(error){
    this.handleError('getUserData: ' + JSON.stringify(error));
  }
}

paymentrequest(total_amount){
  try{
    return  this.httpClient.post(`${this.baseUrl}/api/payment/paymentrequest`,{"total_amount":total_amount});     
  }catch(error){
    this.handleError('paymentrequest: ' + JSON.stringify(error));
  }
}

PaymentDetails(order_id){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/payment/PaymentDetails`,{"order_id":order_id});
  }catch(error) {
    this.handleError("PaymentDetails : "+error);
  }
}

OnlinePaymentChallan(transaction_id,payment_amount,payment_status,application_id,payment_date_time,user_id){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/payment/OnlinePaymentChallan`,{user_id:user_id,payment_amount:payment_amount,transaction_id:transaction_id,date_time:payment_date_time,status_payment:payment_status,application_id:application_id});
  }catch(error) {
    this.handleError("OnlinePaymentChallan : "+error);
  }
} 

downloadFiles(file_name):Observable<Blob>{
  try{
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.httpClient.get(`${this.baseUrl}/api/payment/download?file_name=`+file_name, { headers: headers, responseType: 'blob'}).map(
      (res) => {
          return new Blob([res], { type: 'application/pdf' });
      });
  }catch(error) {
    this.handleError("unable to get Files : "+JSON.stringify(error));
  }
}




My_pplication(){
  try{
    return  this.httpClient.get(`${this.baseUrl}/api/attestation/my_applications`);
  }catch (error){
    this.handleError('get my applications Details : ' + JSON.stringify(error));
  }
}


Details(){
  try{
    return  this.httpClient.get(`${this.baseUrl}/api/cart`);
  }catch (error){
    this.handleError('get cart Details : ' + JSON.stringify(error));
  }
}

async cartRemove(id,institute_id){
  try{
      return await this.httpClient.post(`${this.baseUrl}/api/removeCartvalue`,{'id' : id,'institute_id':institute_id});
    }catch(error){
      this.handleError("cartRemove : "+JSON.stringify(error));
  }
}

emailupdate(email,updated_email){
  try{
    return  this.httpClient.post(`${this.baseUrl}/api/emailUpdate`,{"email": email,"updated_email" : updated_email});
  }catch (error){
    this.handleError('emailupdate : ' + JSON.stringify(error));
  }
}


setEducationDetails(data){  
  try{  
    return  this.httpClient.post(`${this.baseUrl}/api/attestation/setEducationDetails`,{data : data}); 
  }catch(error){
    this.handleError("setEducationDetails: "+JSON.stringify(error));
  }
}

getEducationDetails(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/getEducationDetails`);
  }catch(error) {
      this.handleError("getEducationDetails : "+JSON.stringify(error));
  }
}

getDocumentDetails(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/getDocumentDetails`);
  }catch(error) {
      this.handleError("getDocumentDetails : "+JSON.stringify(error));
  }
}

getDocumentStatus(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/getDocumentStatus`);
  }catch(error) {
      this.handleError("getDocumentStatus : "+JSON.stringify(error));
  }
}

getInstituteStatus(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/getInstituteStatus`);
  }catch(error) {
      this.handleError("getDocumentStatus : "+JSON.stringify(error));
  }
}

getApplyingEducation(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/getApplyingEducation`);
  }catch(error) {
      this.handleError("getApplyingEducation : "+JSON.stringify(error));
  }
}

checkCart(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/attestation/checkCart`);
  }catch(error) {
      this.handleError("checkCart : "+JSON.stringify(error));
  }
}

getProfileValues(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/dashboard/profileValue`,);
}catch(error) {
    this.handleError("getProfileValues : "+JSON.stringify(error));
}

}

updateProfileValues(data){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/dashboard/updateProfile`,{
      data : data
    });
  }catch(error) {
      this.handleError("updateProfileValues : "+JSON.stringify(error));
  }

}

// admin-dashboard 

sendOtp(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/admin/adminDashboard/get_otp`);
  }catch(error) {
      this.handleError("sendOtp : "+JSON.stringify(error));
  }
}
updateOtp(){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/admin/adminDashboard/update_otp`);
  }catch(error) {
      this.handleError("updateOtp : "+JSON.stringify(error));
  }
}

getTranscriptDetails(user_id){
  try{
    return this.httpClient.get(`${this.baseUrl}/api/admin/adminDashboard/getTranscriptDetails?user_id=${user_id}`);
  }catch(error) {
      this.handleError("getTranscriptDetails : "+JSON.stringify(error));
  }
}

downloadFilesAdmin(file_name,user_id):Observable<Blob>{
  try{
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.httpClient.get(`${this.baseUrl}/api/admin/adminDashboard/download?file_name=${file_name}&user_id=${user_id}`, { headers: headers, responseType: 'blob'}).map(
      (res) => {
          return new Blob([res], { type: 'application/pdf' });
      });
  }catch(error) {
    this.handleError("unable to get Files : "+JSON.stringify(error));
  }
}

getTotalApplications(sort: string, order: string, page: number,per_page : number): Observable<applicationApi> {
  try{
  const requestUrl = `${this.baseUrl}/api/admin/adminDashboard/total?sort=${sort}&order=${order}&page=${page + 1}&per_page=${per_page}`;
    return this.httpClient.get<applicationApi>(requestUrl);
  }catch(error){
    this.handleError("getTotalApplications : "+JSON.stringify(error));
  }
  }
  
  getPendingApplications(sort: string, order: string, page: number,per_page : number): Observable<applicationApi> {
    try{
    const requestUrl = `${this.baseUrl}/api/admin/adminDashboard/unsigned?sort=${sort}&order=${order}&page=${page + 1}&per_page=${per_page}`;
      return this.httpClient.get<applicationApi>(requestUrl);
    }catch(error){
      this.handleError("getPendingApplications : "+JSON.stringify(error));
    }
    }
  
    getVerifiedApplications(sort: string, order: string, page: number,per_page : number): Observable<applicationApi> {
      try{
      const requestUrl = `${this.baseUrl}/api/admin/adminDashboard/verified?sort=${sort}&order=${order}&page=${page + 1}&per_page=${per_page}`;
      return this.httpClient.get<applicationApi>(requestUrl);
    }catch(error){
      this.handleError("getVerifiedApplications : "+JSON.stringify(error));
    }
    }

    getSignedApplications(sort: string, order: string, page: number,per_page : number): Observable<applicationApi> {
      try{
      const requestUrl = `${this.baseUrl}/api/admin/adminDashboard/signed?sort=${sort}&order=${order}&page=${page + 1}&per_page=${per_page}`;
      return this.httpClient.get<applicationApi>(requestUrl);
    }catch(error){
      this.handleError("getVerifiedApplications : "+JSON.stringify(error));
    }
    }

    updateVerifiedBy(email, id){
      try{
        return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/pending/verifiedBy`,{"email":email,"id":id});
      }catch(error) {
        this.handleError("login from api : "+error);
      }
    }

    // sendEmail(id){
    //   try{
    //     return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/sendEmail`,{"id":id});
    //   }catch(error) {
    //     this.handleError("login from api : "+error);
    //   }
    // }
    
    getSigned_namrata_Applications(sort: string, order: string, page: number,per_page : number): Observable<applicationApi> {
      try{
      const requestUrl = `${this.baseUrl}/api/admin/adminDashboard/signed_namrata?sort=${sort}&order=${order}&page=${page + 1}&per_page=${per_page}`;
      return this.httpClient.get<applicationApi>(requestUrl);
    }catch(error){
      this.handleError("getVerifiedApplications : "+JSON.stringify(error));
    }
    }

    getEmailActivityTracker(){
      try{
        return this.httpClient.get(`${this.baseUrl}/api/admin/adminDashboard/getEmailActivityTracker`);
      }catch(error) {
        this.handleError("getEmailActivityTracker : "+JSON.stringify(error));
      }
    }

    getEmailActivityTrackerMonthWise(params){
      try{
        return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/getEmailActivityTrackerMonthWise`,{
          yearMonth : params,          
        });
      } catch(error) {
          this.handleError("getEmailActivityTrackerMonthWise : "+JSON.stringify(error));
      }
    }

    async getAllTranscriptData(userId){
      try{
        return await this.httpClient.get(`${this.baseUrl}/api/admin/adminDashboard/transcript_lock?userId=`+userId).toPromise();
      }catch(error) {
        this.handleError("Error in getAllTranscriptData : "+error);
      }
    }

    updateErrataTranscript(errataTranscript){
      try{
        return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/updateErrataTranscript`,{"errataTranscript":errataTranscript});
      }catch(error) {
        this.handleError("login from api : "+error);
      }
    }
    
downloadTranscript(file):Observable<Blob>{
  try {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
      return this.httpClient.get(`${this.baseUrl}/api/admin/adminDashboard/downloadTranscript?file=${file}`, { headers: headers, responseType: 'blob'}).map(
        (res) => {
          return new Blob([res], { type: 'application/pdf' });
        });

  }
   catch (error) {
    this.handleError("unable to get the Files :"+JSON.stringify(error))
  }
  }

    
        //////////CREATED BY PRIYANKA
        getStatuswithid(Appc_id){
          try{ 
                return  this.httpClient.post(`${this.baseUrl}/api/dashboard/appTrackerwithid`,{"app_id": Appc_id});     
           }catch (error){ 
            this.handleError('getStatus: ' + JSON.stringify(error));
          }
          
         }
         getStatus(){
          try{
                return  this.httpClient.get(`${this.baseUrl}/api/dashboard/appTracker`);     
           }catch (error){ 
            this.handleError('getStatus: ' + JSON.stringify(error));
          }
          
         }
    
        getApplicationdetails(): any {
          try{
            return this.httpClient.get(`${this.baseUrl}/api/dashboard/getApp_details`);
          }catch(error){
            this.handleError("get application details: "+error);
          }
        }
    
        signpdf(appl_id: any) {
          try{
            return this.httpClient.post(`${this.baseUrl}/api/signpdf/signpdf`,{"appl_id":appl_id})
          }catch(error) {
            this.handleError("getEmailActivityTracker : "+JSON.stringify(error));
          }
        }
        

         /**
   * Adds notifications to the Database
   * @author Rafique Shaikh
   */

  socketmessage = new Subject();
  socketNotificationNo = new Subject();
  private notification_no : any;
private messages = [];

  sendNotifications(appId){
    try {
      return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/sendNotification`, {"id":appId});
    } catch (error) {
      this.handleError("sendNotifications: "+JSON.stringify(error));
    }
  }

  receiveNotifications(userId){
    return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/receiveNotification`, {"id":userId}).subscribe(notifications=>{
      this.messages = notifications['data'];
      this.notification_no = notifications['notification_no'];
      if(notifications['data'].length == 0){
        this.socketNotificationNo.next('');
        this.socketmessage.next('');
      }else if(notifications['data'].length > 0){
        this.socketNotificationNo.next(this.notification_no);
        this.socketmessage.next(this.messages);
      }
    },error => {
      this.handleError("receiveNotifications: "+JSON.stringify(error));
      });
  }

  reloadnotification(userId){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/receiveNotification`,{"id":userId});
    }catch(error) {
      this.handleError("notification : "+error);
    }
  }

  makeReadNotification(userId){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/makeReadNotification`,{"id":userId});
    }catch(error) {
      this.handleError("makeReadNotification : "+error);
    }
  }

  deleteNotification(userId,noti_id){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/deleteNotification`,{"id":userId,"noti_id":noti_id});
    }catch(error) {
      this.handleError("deleteNotification : "+error);
    }
  }

  getTheme(){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/dashboard/getTheme`);
    }catch(error) {
      this.handleError("getTheme : "+error);
    }
  }

 /**
   * Adds notifications to the Database for errata
   * @author Priyanka khandagale
   */
  sendmessage(msg_from_admin_data){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/trans_sendmessage`,{"msg":msg_from_admin_data});
    }catch(error) {
      this.handleError("ERROR sendmessage : "+error);
    }
  }

  checkapplications(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/attestation/checkapplications`);
    }catch(error) {
      this.handleError("checkapplications : "+error);
    }
  }

  getAllPayments(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/payment/getAllPayments`);     
    }catch(error){
      this.handleError('getAllPayments: ' + JSON.stringify(error));
    }
  }

  checkPayment(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/payment/checkPayment`);     
    }catch(error){
      this.handleError('checkPayment: ' + JSON.stringify(error));
    }
  }

  downloadReceipt(id):Observable<Blob>{
    try{
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
        return this.httpClient.get(`${this.baseUrl}/api/attestation/downloadPaymentReceipt?appl_id=`+id, { headers: headers, responseType: 'blob'}).map(
          (res) => {
            return new Blob([res], { type: 'application/pdf' });
          });
     }catch(error){
      this.handleError("Error downloadpaymentReceipt: "+JSON.stringify(error));
    }
  }

  previewLetter(){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/preview`,{});
      
    }catch(error) {
      this.handleError("previewLetter : "+error);
    }
  }

  paymentRequest(amount){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/payment/paymentRequest`,{"amount":amount});     
    }catch(error) {
      this.handleError("firstpaymentrequest : "+error);
    }
  }

  
  //Admin request 

  downloadApplicationLetter(email, user_id){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/checkLetterGenerate`,{"email":email,"user_id":user_id});
    }catch(error) {
      this.handleError("login from api : "+error);
    }
  }

  generatepreviewLetter(user_id){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/adminDashboard/preview`,{"user_id":user_id});
    }catch(error) {
      this.handleError("previewLetter : "+error);
    }
  }

  getCertificateDetails(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/attestation/getCertificateDetails`);     
    }catch(error){
      this.handleError('getAllPayments: ' + JSON.stringify(error));
    }
  }

  //student management

  getallstudents(){
    try{
        return this.httpClient.get(`${this.baseUrl}/api/admin/students`);
    }catch(error) {
        this.handleError("getallstudents : "+JSON.stringify(error));
      }
  }
  
  getallstudentstypewise(stu_type){
    try{
        return this.httpClient.get(`${this.baseUrl}/api/admin/students?stu_type=`+stu_type);
    }catch(error) {
        this.handleError("getallstudents : "+JSON.stringify(error));
      }
  }
  
  
  status(status,userId){
    try{
      return this.httpClient.put(`${this.baseUrl}/api/admin/status`,{"status":status,"userId": userId});
    }catch(error) {
      this.handleError("status : "+JSON.stringify(error));
    }
  }

  async getAllStudentData(userId){
    try{
        return await this.httpClient.get(`${this.baseUrl}/api/admin/View/studentview?userId=`+userId).toPromise();
    }catch(error) {
    this.handleError("getAllUserData : "+error);
    }
  }

  preview(userId,courseId,id){
    try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/Application/preview`,{userId:userId,courseId:courseId,id:id});
    }catch(error) {
      this.handleError("preview : "+JSON.stringify(error));
    }
  }

  //payment tab

  getPaymentDetails(order_no){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/admin/paymentDetails/getPaymentDetails?order_no=`+order_no);
    }catch(error) {
        this.handleError("getPaymentDetails : "+JSON.stringify(error));
    }
  }

  getCountryDetails(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/admin/checkEligibility/getCountryDetails`); 
    }catch(error){
      this.handleError('getCountryDetails: ' + JSON.stringify(error));
    }
  }

  getAllUniversities(countryName){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/checkEligibility/getUniversities`,{"countryName":countryName});
    }catch(error) {
      this.handleError("getAllUniversities : "+error);
    }
  }

  getCollegeName(countryName,universityName){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/checkEligibility/getCollegeName`,{"countryName":countryName,"universityName":universityName});
    }catch(error) {
      this.handleError("getCollegeName : "+error);
    }
  }

  checkEligibility(countryName,universityName,collegeName){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/admin/checkEligibility/checkEligibility`,{"countryName":countryName,"universityName":universityName,"collegeName":collegeName});
    }catch(error) {
      this.handleError("checkEligibility : "+error);
    }
  }

  private handleError(error){
    console.error(error);
  }
}
