import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  submit() {
    // placeholder handling
    alert(`Login submitted: ${this.loginid}`);
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }
}
