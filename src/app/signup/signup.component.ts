import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  providers: [ApiCallerService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string;
  phone: string;
  username: string;
  country: string;
  state: string;
  city: string;
  password: string;
  errorMsg: string;
  otp: string;
  savedUsername: string;

  constructor(private _api: ApiCallerService, private router: Router) { }

  ngOnInit() {
  }

  doSignUp() {
    if(this.name != null && this.phone != null && this.password != null && 
      this.username != null && this.country != null && this.state != null && this.city != null) {
        var url = "/signup";
        url += "?name="+this.name;
        url += "&phone="+this.phone;
        url += "&username="+this.username;
        url += "&password="+this.password;
        url += "&country="+this.country;
        url += "&state="+this.state;
        url += "&city="+this.city;
        console.log(url);
        this._api.doPostRequest(url, {}).subscribe(
          res => {
            if(res.error == null) {
              console.log(res.data);
              this.savedUsername = this.username;
              this.name = "";
              this.phone = "";
              this.username = "";
              this.password = "";
              this.country = "";
              this.state = "";
              this.city = "";
              let element: HTMLElement = document.getElementById('verifyOtp') as HTMLElement;
              element.click();
            } else {
              this.errorMsg = res.error;
            }
          }
        );
    } else {
      this.errorMsg = "Please fill in the required fields and ensure that phone number is not invalid."
    }
  }

  verifyOtp() {
    if(this.username != null && this.otp != null) {
      var url = "/verify/"+this.savedUsername+"/"+this.otp;
      this._api.doPostRequest(url, {}).subscribe(
        res => {
          let elem: HTMLElement = document.getElementById('dismissModal') as HTMLElement;
          console.log(res);
          if(res.error == null) {
            this.router.navigate(['/login']);
            elem.click();
          } else {
            this.errorMsg = "OTP Verification failed";
          }
        }
      )
    }
  }

}
