import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any | number;
  qTitle: string = '';

  questions: Question[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.params['qid'];
    this.qTitle = this.activatedRoute.snapshot.params['title'];

    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        this.questions = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
}
