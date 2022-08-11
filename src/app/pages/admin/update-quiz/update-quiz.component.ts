import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  quizId: any | number;
  quiz: any;

  categories = new Array();
  selectedCategory: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.quizId = params['quizId'];
    });

    // get quiz by id
    this.quizService.getQuiz(this.quizId).subscribe(
      (data: any) => {
        this.quiz = data;
        this.selectedCategory = this.quiz.category;
      },
      (error) => {
        console.log(error);
      }
    );

    // load category
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // update form submit
  updateQuiz() {
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Updated!', 'Quiz updated successfully', 'success').then(
          (e) => {
            this.router.navigate(['/admin-dashboard/quiz']);
          }
        );
      },
      (error) => {
        Swal.fire('Error!', 'Error in updating quiz', 'error');
        console.log(error);
      }
    );
  }
}
