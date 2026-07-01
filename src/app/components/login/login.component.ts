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
    const url = '/api/users/login';
    const body = {
      loginId: this.loginid,
      password: this.password
    };
    this.http.post(url, body).subscribe({
      next: (response:any) => {
        const loginId = response?.loginId || this.loginid;
        this.authService.setLoginId(loginId);
        this.router.navigate(['/list']);
      },
      error: (error) => {
        console.error('Error submitting login:', error);
        alert('Failed to submit login. Please try again.');
      }
    })
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }
}
