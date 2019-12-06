import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  providers: [ AuthService ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg: string;
  loginEmail: string;
  loginPwd: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // if(!this.auth.getCurrentUser() != null) {
    //   this.router.navigate(['/searchPage']);
    // }
  }

  attemptLogin() {
    if(this.loginEmail != null && this.loginEmail.trim() != "" && this.loginPwd != null && this.loginPwd.trim() != "") {
      this.auth.login(this.loginEmail, this.loginPwd).subscribe(res => {
        console.log(res);
        this.auth.setCurrentUser(this.loginEmail);
        this.router.navigate(['/welcome']);
      });
    } else {
      this.errorMsg = "Username and Password cannot be blank strings.";
    }
  }

}
