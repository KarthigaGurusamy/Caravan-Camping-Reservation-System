import { AnimationOptions } from 'ngx-lottie';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AppResponse } from 'src/app/model/appResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService:AuthService,private route:Router)
  {

  }
  options: AnimationOptions = {
    path: '/assets/register.json',
  };
  error:String='';
  onSubmit(registerForm:NgForm)
  {
    this.authService.register(registerForm.value).subscribe({
      next: (response: AppResponse) => {
        this.route.navigate(['login'], {replaceUrl:true});
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
