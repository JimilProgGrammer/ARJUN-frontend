import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiCallerService } from '../services/api-caller.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  providers: [ AuthService, ApiCallerService ],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  username: string;
  user: any;
  errorMsg: string;
  respMsg: string;

  private degrees: Array<any> = [];
  private newDegree: any = {};

  private coursesArray: Array<any> = [];
  private newCourse: any = {};

  private interests: any = {}

  constructor(private auth: AuthService, private _api: ApiCallerService) { }

  ngOnInit() {
    this.username = this.auth.getCurrentUser();
    this._api.doGetRequest("/get_profile/"+this.username).subscribe(res => {
      if(res.error == null) {
        this.user = res.data.user;
        this.degrees = this.user.academics;
        this.coursesArray = this.user.courses;
        this.interests = this.user.interests;
      } else {
        this.errorMsg = res.error;
      }
    });
  }

  addFieldValue() {
    this.degrees.push(this.newDegree)
    this.newDegree = {};
  }

  deleteFieldValue(index) {
      this.degrees.splice(index, 1);
  }

  addCourse() {
    this.newCourse.domain = ((document.getElementById("myInput1") as HTMLInputElement).value).toLowerCase();
    this.coursesArray.push(this.newCourse)
    this.newCourse = {};
  }

  deleteCourse(index) {
      this.coursesArray.splice(index, 1);
  }

  updateProfile(updateProfileForm: NgForm) {
    if(!updateProfileForm.invalid) {
      this.user.academics = this.degrees;
      this.user.courses = this.coursesArray;
      this.user.interests = this.interests;
      console.log(this.user);
      this._api.doPostRequest("/update_profile/"+this.username, this.user).subscribe(res => {
        console.log(res);
        if(res.error == null) {
          this.respMsg = res.data;
        } else {
          this.errorMsg = res.error;
        }
      });
    }
  }

  autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    (inp.addEventListener("keyup", function() {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists("");
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function() {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists(inp);
            });
            a.appendChild(b);
          }
        }
    }));
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) { x = x.getElementsByTagName("div"); }  
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
    }
  
    autoSuggest() {
      /*An array containing all the country names in the world:*/
      var countries = ['Artificial Intelligence(AI)', 'Big Data Analytics', 'Blockchain', 'Cloud Computing', 'Cyber Security', 'Data Mining', 'Deep Learning', 'Face Recognition', 'Image Processing', 'Internet of Things(IoT)', 'Machine Learning', 'Network Security', 'Neural Network', 'Smart Grid'];
      /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
      this.autocomplete((<HTMLInputElement>document.getElementById("myInput")),countries);
    }
  
    autoSuggest1() {
      /*An array containing all the country names in the world:*/
      var countries = ['Artificial Intelligence(AI)', 'Big Data Analytics', 'Blockchain', 'Cloud Computing', 'Cyber Security', 'Data Mining', 'Deep Learning', 'Face Recognition', 'Image Processing', 'Internet of Things(IoT)', 'Machine Learning', 'Network Security', 'Neural Network', 'Smart Grid'];
      /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
      this.autocomplete((<HTMLInputElement>document.getElementById("myInput1")),countries);
    }
  
    autoSuggest2() {
      /*An array containing all the country names in the world:*/
      var countries = ['Artificial Intelligence(AI)', 'Big Data Analytics', 'Blockchain', 'Cloud Computing', 'Cyber Security', 'Data Mining', 'Deep Learning', 'Face Recognition', 'Image Processing', 'Internet of Things(IoT)', 'Machine Learning', 'Network Security', 'Neural Network', 'Smart Grid'];
      /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
      this.autocomplete((<HTMLInputElement>document.getElementById("myInput2")),countries);
    }

}
