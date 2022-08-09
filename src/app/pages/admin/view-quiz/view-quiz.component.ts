import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css'],
})
export class ViewQuizComponent implements OnInit {
  quizzes = new Array();

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.quizzes().subscribe(
      (data: any) => {
        console.log("Data: ", data);
        
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!!', 'Error loading data', 'error');
      }
    );
  }

  deleteQuiz(qid: number) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure want to delete this quiz ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qid).subscribe(
          (response) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid);
            Swal.fire('Deleted !!!', 'Quiz deleted Successfully.', 'success');
          },
          (error) => {
            Swal.fire('Error !!!', 'Error deleting quiz.', 'error');
          }
        );
      }
    });
  }
}
