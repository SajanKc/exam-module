import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  qId: number = 0;
  qTitle: string = '';
  question = {
    quiz: {
      quizId: 0,
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private matSnack: MatSnackBar,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.qId = params['qId'];
      this.qTitle = params['qTitle'];
      this.question.quiz['quizId'] = this.qId;
    });

    this.loadQuestion();
  }

  loadQuestion() {
    this.questionService.getQuestionById(this.qId).subscribe((data: any) => {
      this.question = data;
    });
  }

  updateQuestion() {
    if (
      this.question.content?.trim() === '' ||
      this.question.content === null
    ) {
      this.matSnack.open('Content is Required !!!', '', {
        duration: 2000,
      });
      return;
    }

    if (this.question.answer?.trim() === '' || this.question.answer === null) {
      this.matSnack.open('Answer is Required !!!', '', {
        duration: 2000,
      });
      return;
    }

    this.questionService.updateQuestion(this.qId, this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question updated successfully', 'success').then(
          () => {
            this.goBack();
          }
        );
      },
      (error: any) => {
        Swal.fire('Error', 'Error updating question', 'error');
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
