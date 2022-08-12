import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/model/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

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
    private router: Router,
    private quizService: QuizService,
    private location: Location
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

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.quizId]);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
