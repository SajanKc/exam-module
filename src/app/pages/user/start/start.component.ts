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

  marksGot: number = 0;
  correctAnswers: number = 0;
  attempt = 0;

  isSubmit: boolean = false;

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
        this.questions.forEach((question: any) => {
          question['givenAnswer'] = '';
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error loading data...', 'error');
      }
    );
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.isSubmit = true;
        this.questions.forEach((question: any) => {
          if (question.givenAnswer == question.answer) {
            this.correctAnswers++;
            // calculating quiz marks
            let marks = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marks;
          }

          if (question.givenAnswer.trim() != '') {
            this.attempt++;
          }
        });
      }
    });
  }

  preventBackButton() {
    history.pushState(null, '', window.location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
}
