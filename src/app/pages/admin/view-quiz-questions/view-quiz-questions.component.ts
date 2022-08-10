import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

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
    this.qId = this.activatedRoute.snapshot.params['qId'];
    this.qTitle = this.activatedRoute.snapshot.params['title'];

    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => console.log(error)
    );
  }

  deleteQuestion(questionId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure want to delete?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
            });
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
      }
    });
  }
}
