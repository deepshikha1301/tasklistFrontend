import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  loginId = '';
  password = '';
  signupError = '';

  constructor(private router: Router, private http: HttpClient) {}

  submit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    console.log('Signup submitted:', this.email, this.loginId);
    const url = '/api/users/register';
    const body = {
      email: this.email,
      loginId: this.loginId,
      password: this.password
    };
    this.http.post(url, body).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error submitting signup:', error);
        this.signupError = 'Failed to submit signup. Please try again.';
      }
    });
  }
}
