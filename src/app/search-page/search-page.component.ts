import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import 'jquery-ui';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-search-page',
  providers: [ApiCallerService, AuthService],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  username: string;
  begQuiz:any;
  intQuiz:any;
  advQuiz:any;
  courses:any;
  keyword: string;
  showCourses: boolean = false;
  selectedCourse: any;
  errorMsg: string;
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

  constructor(private _api: ApiCallerService, private auth: AuthService) { }

  ngOnInit() {
    this.username = this.auth.getCurrentUser();
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

  autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    (inp.addEventListener("keyup", function(e) {
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
            b.addEventListener("click", function(e) {
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
        if (x) x = x.getElementsByTagName("div");  
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

  performSearch() {
    this.keyword = ((document.getElementById("myInput") as HTMLInputElement).value).toLowerCase();
    console.log(this.keyword);
    if(this.keyword != null && this.keyword.trim() != "") {
      this._api.doGetRequest("/courses?username="+this.username+"&domain="+this.keyword).subscribe(res => {
        // if(res.data.type == "quiz") {
        //   this.begQuiz = res.data.beginner;
        //   this.intQuiz = res.data.intermediate;
        //   this.advQuiz = res.data.advanced;
        // } else if(res.data.type == "course") {
        //   this.courses = res.data.courses;
        // }
        this.courses = res.data;
        console.log(res.data);
        this.showCourses = true;
      });
    }
  }

  performSearch1(keyword:string) {
    console.log("SearchPage: Triggered by chat bot");
    if(keyword != null && keyword.trim() != "") {
      this._api.doGetRequest("/courses?username="+this.username+"&domain="+keyword).subscribe(res => {
        console.log(res.data);
        // if(res.data.type == "quiz") {
        //   this.begQuiz = res.data.beginner;
        //   this.intQuiz = res.data.intermediate;
        //   this.advQuiz = res.data.advanced;
        // } else if(res.data.type == "course") {
        //   this.courses = res.data.courses;
        // }
        this.courses = res.data;
        this.showCourses = true;
      });
    }
  }

  domainReceivedHandler(domain: string) {
    console.log("SearchPage", domain);
    this.performSearch1(domain);
  }

  fetchDetails(course_title, course_source) {
    this._api.doGetRequest("/course_description?title="+course_title+"&source="+course_source).subscribe(res => {
      if(res.error == null) {
        this.selectedCourse = res.data;
      } else {
        this.errorMsg = "There was a problem in fetching the course details. Please try again later.";
      }
    });
  }

}
