import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Login } from 'src/app/model/login';
import { AuthService } from 'src/app/service/auth.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username:String='';
  password:String='';
  error:String='';

  constructor(private authService: AuthService,private router:Router) {}
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  onLogin(loginForm: NgForm): void {
    let login: Login = {
      username: loginForm.value.username,
      password: loginForm.value.password,
    };
    this.authService.login(login).subscribe({
      next: (response: AppResponse) => {
        let user: AppUser = response.data;
        this.authService.setLoggedIn(user);
        this.error = '';
        if (user.role === CONSTANT.ADMIN) {
          this.router.navigate(['/admin/home'], { replaceUrl: true });
        }
        else if(user.role === CONSTANT.USER){
          this.router.navigate(['/campings'], { replaceUrl: true });

        }
        else 
        {
          this.router.navigate(['/'], { replaceUrl: true });

        }
      },
      error: (err) => {
        console.log(err);

        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => {
        console.log('There are no more action happen.');
      },
    });
  }
}
