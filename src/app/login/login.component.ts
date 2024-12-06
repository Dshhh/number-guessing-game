import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { CommonModule } from '@angular/common';
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = "";
  password = "";
  errorMessage = "";
  showPassword = false;


  correct_username = "admin";
  correct_password = CryptoJS.SHA256('1234567890').toString();

  constructor(private router: Router, private session: SessionService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(form: any) {
    const hashedPassword = CryptoJS.SHA256(this.password).toString();

    if (hashedPassword === this.correct_password && this.username === this.correct_username) {
      this.session.login();
      this.router.navigate(["game"]);
    } else {
      this.errorMessage = "Invalid username or password";
    }
  }
}
