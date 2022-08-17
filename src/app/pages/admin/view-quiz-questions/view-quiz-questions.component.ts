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
  quizId: any | number;
  qTitle: string = '';

  questions: Question[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.qTitle = this.activatedRoute.snapshot.params['title'];

    this.questionService.getQuestionsOfQuiz(this.quizId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => console.log(error)
    );
  }

  deleteQuestion(qId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure want to delete?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(qId).subscribe(
          (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Question has been deleted successfully.',
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
