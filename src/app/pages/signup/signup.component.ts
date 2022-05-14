import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  submitted: Boolean = false;

  // used in form
  user: User = new User();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get forms(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
      firstName: [undefined, Validators.required],
      lastName: [undefined, Validators.required],
      email: [
        undefined,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phone: [
        undefined,
        Validators.compose([Validators.required, Validators.maxLength(10)]),
      ],
    });
  }

  registerUser(user: any) {
    this.submitted = true;
    if (this.userForm.valid) {
      user.profile = 'default.png';
      this.userService.addNewUser(user).subscribe(
        (response: any) => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    }
  }
}
