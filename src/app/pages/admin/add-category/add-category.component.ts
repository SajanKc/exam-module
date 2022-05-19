import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private matSnack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.matSnack.open('Title Required !!!', '', {
        duration: 2000,
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.category = {
          title: '',
          description: '',
        };
        Swal.fire('Success', 'Category added successfully.', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Server Error !!!', 'error');
      }
    );
  }
}
