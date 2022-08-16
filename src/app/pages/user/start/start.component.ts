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

  totalTime: any;
  timer: any;

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

        // maximum 2 minutes for each question and converting to seconds
        this.totalTime = this.questions.length * 2 * 60;
        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((question: any) => {
          question['givenAnswer'] = '';
        });
        this.startTimer();
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
        this.submitQuizAnswer();
      }
    });
  }

  submitQuizAnswer() {
    // 1. Server side answer checking
    this.questionService.submitQuizAnswer(this.questions).subscribe(
      (data: any) => {
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempt = data.attempt;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );

    // 2. Client side answer checking
    // this.isSubmit = true;
    // this.questions.forEach((question: any) => {
    //   if (question.givenAnswer == question.answer) {
    //     this.correctAnswers++;
    //     // calculating quiz marks
    //     let marks = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marks;
    //   }
    //   if (question.givenAnswer.trim() != '') {
    //     this.attempt++;
    //   }
    // });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuizAnswer();
        window.clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let timeString = new Date(this.timer * 1000)
      .toISOString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    return timeString;
  }

  preventBackButton() {
    history.pushState(null, '', window.location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
}
