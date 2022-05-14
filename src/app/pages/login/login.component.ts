import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  get forms(): { [key: string]: AbstractControl } {
    return this.userLoginForm.controls;
  }

  loginUser(userData: any) {
    console.log('Login data: ', userData);
  }

  initForm() {
    this.userLoginForm = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }
}
