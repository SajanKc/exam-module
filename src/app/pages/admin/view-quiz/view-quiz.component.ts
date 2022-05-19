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
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!!', 'Error loading data', 'error');
      }
    );
  }
}
