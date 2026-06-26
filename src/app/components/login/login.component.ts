import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private http: HttpClient) {}

  submit() {
    console.log('Login submitted:', this.loginid);
    const url = 'http://localhost:8080/api/users/login';
    const body = {
      loginId: this.loginid,
      password: this.password
    };
    this.http.post(url, body).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
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
