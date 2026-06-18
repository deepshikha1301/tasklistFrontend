import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  loginid = '';
  password = '';

  constructor(private router: Router) {}

  submit() {
    alert(`Signup submitted: ${this.email}`);
    this.router.navigate(['/login']);
  }
}
