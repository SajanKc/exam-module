import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  quizId: number = 0;
  questions: any;

  constructor(
    private locationStrategy: LocationStrategy,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.initQuizId();
    this.loadQuestions();
  }

  initQuizId() {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
  }

  loadQuestions() {
    this.questionService.getActiveQuestionsOfQuiz(this.quizId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error loading data...', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', window.location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
}
