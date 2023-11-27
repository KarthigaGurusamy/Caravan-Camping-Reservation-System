import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Login } from 'src/app/model/login';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  username:String='';
  password:String='';
  error:String='';
  onSubmit(loginForm:NgForm) :void
  {    
    let login: Login = {
      username: loginForm.value.username,
      password: loginForm.value.password,
    };
    this.authService.login(login).subscribe({
      next: (response: AppResponse) => {
        let user: AppUser = response.data;
        this.authService.setLoggedIn(user);
      },
      error: (err) => {
        console.log(err);

        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => console.log('There are no more action happen.'),
    });

  }

}
