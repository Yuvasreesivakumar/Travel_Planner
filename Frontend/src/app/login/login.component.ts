import { Component,Input } from '@angular/core';
import { Router }  from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log(response);
        this.navigateToHome();
        // Optionally, you can navigate to the home page or display a success message here
      },
      error => {
        console.error('Error logging in:', error);
        // Optionally, you can display an error message here
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToHome(){
    this.router.navigate([''])
  }
}
