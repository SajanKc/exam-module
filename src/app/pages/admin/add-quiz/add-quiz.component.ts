import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  categories = new Array();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private matSnack: MatSnackBar,
    private quizService: QuizService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error !!!', 'Error loading data.', 'error');
      }
    );
  }

  onFormSubmit() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.matSnack.open('Title is required !!!', '', {
        duration: 2000,
      });
      return;
    }
    // Add other validations

    this.quizService.addQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz added successfully.', 'success').then(
          (result) => {
            this.router.navigate(['/admin-dashboard/quiz']);
          }
        );
      },
      (error) => {
        Swal.fire('Error', 'Error adding quiz.', 'error');
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
