import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginid = '';
  password = '';

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  submit() {
    console.log('Login submitted:', this.loginid);
    this.authService.login(this.loginid, this.password).subscribe((res:any) => {
      this.authService.setToken(res.access_token);
      this.authService.setLoginId(this.loginid);
      this.router.navigate(['/list']);
    })
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }
}
