import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: '',
    enabled: '',
    authorities: [{ authority: '' }],
  };

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log('USER: ', this.user);
  }
}
