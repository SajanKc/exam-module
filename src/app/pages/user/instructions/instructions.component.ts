import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/model/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  quizId: number = 0;
  quiz: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.getQuizById();
  }

  getQuizById() {
    this.quizService.getQuiz(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
