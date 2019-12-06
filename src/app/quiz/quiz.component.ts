import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input("questions") questions: any[];
  @ViewChild('questionTest') questionTest : any;
  answerArray = [];
  totalAnswered: number = 0;
	rightAnswer: number;

  constructor() { }
  
  ngOnInit() {
  }

  /**Method call on submit the test */
	submitTest() {
		this.rightAnswer = 0;
		this.totalAnswered = 0;
		for (let i = 0; i < this.questions.length; i++) {
			if ("selected" in this.questions[i] && (this.questions[i]["selected"] != null)) {
				this.totalAnswered++;
				if (this.questions[i]["selected"] == this.questions[i]["answer"]) {
					this.rightAnswer++;
				}
			}
		}
	}

}
