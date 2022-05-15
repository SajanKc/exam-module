import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get forms(): { [key: string]: AbstractControl } {
    return this.userLoginForm.controls;
  }

  loginUser(userData: any) {
    if (this.userLoginForm.valid) {
      this.loginService.generateToken(userData).subscribe(
        (data: any) => {
          console.log('Token ', data);

          // Login...
          this.loginService.loginUser(data.token);

          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user);
            console.log('User', user);
            // redirect ... ADMIN: admin-dashboard
            //redirect ... NORMAL: user-dashboard
          });
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
    }
  }

  initForm() {
    this.userLoginForm = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }
}
