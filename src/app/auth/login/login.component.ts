import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginError = false;

  constructor(private authService: AuthService) {}

  onSubmit(form: any): void {
    const { username, password } = form.value;
    if (!this.authService.login(username, password)) {
      this.loginError = true;
    }
  }
}
