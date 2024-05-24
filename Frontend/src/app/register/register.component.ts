import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.navigateToLogin();
        // Optionally, you can navigate to the home page or display a success message here
      },
      error => {
        console.error('Error registering user:', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}
