import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  providers: [ApiCallerService, AuthService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMsg: string;
  courses: any;
  username:string;

  constructor(private _api: ApiCallerService, private auth: AuthService) { }

  ngOnInit() {
    this.username = this.auth.getCurrentUser();
    this._api.doGetRequest("/courses?username="+this.username+"&domain=blockchain").subscribe(
      res => {
        if(res.error == null) {
          this.courses = res.data;
          for(let course of this.courses) {
            if(course.course_source === "coursera") {
              let title = String(course.course_title).replace(" ","-");
              course.course_link = "https://www.coursera.org/learn/"+title;
            }
          }
          console.log(this.courses);
        } else {
          this.errorMsg = res.error;
        }
      }
    );
  }

}
