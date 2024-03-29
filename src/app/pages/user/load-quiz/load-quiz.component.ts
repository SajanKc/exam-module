import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  cId: number = 0;
  quizzes: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cId = params['cId'];
      this.loadQuiz();
    });
  }

  loadQuiz() {
    if (this.cId == 0) {
      this.quizService.getActiveQuizzes().subscribe(
        (data) => {
          this.quizzes = data;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.quizService.getActiveQuizzesOfCategory(this.cId).subscribe(
        (data) => {
          this.quizzes = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
