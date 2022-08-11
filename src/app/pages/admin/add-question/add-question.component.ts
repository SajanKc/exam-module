import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
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
    this.qId = this.activatedRoute.snapshot.params['qId'];
    this.qTitle = this.activatedRoute.snapshot.params['qTitle'];
    this.question.quiz['quizId'] = this.qId;
  }

  // questionEditorConfig: AngularEditorConfig = {
  //   minHeight: '100px',
  // };

  addQuestion() {
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

    this.questionService.addQuestionOfQuiz(this.question).subscribe(
      (data: Question) => {
        Swal.fire('Success', 'Question added successfully', 'success').then(
          () => {
            this.goBack();
          }
        );
      },
      (error: any) => {
        Swal.fire('Error', 'Error adding question', 'error');
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
