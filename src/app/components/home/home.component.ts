import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Camping } from 'src/app/model/camping';
import { Login } from 'src/app/model/login';
import { AuthService } from 'src/app/service/auth.service';
import { CampingService } from 'src/app/service/camping.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  campingList : Camping[]=[];

  constructor(private campingService : CampingService, private router:Router,private authService:AuthService,
    private storageService: StorageService){}

  ngOnInit(): void {
    this.campingService.getHomeCampings().subscribe({
      next: (response: AppResponse) => {
        this.campingList = response.data;
        console.log(this.campingList);
        
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  getHomeLocations(id:number)
  {
    this.router.navigate(['/location'],{queryParams:{id:id}});
  }



  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  register: AnimationOptions = {
    path: '/assets/register.json',
  };

  username:String='';
  password:String='';
  error:String='';
  onLogin(loginForm:NgForm) :void
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

  onRegister(registerForm:NgForm)
  {
    this.authService.register(registerForm.value).subscribe({
      next: (response: AppResponse) => {
      },
      error: (err) => {
        console.log(err);

        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => console.log('There are no more action happen.'),
    });
    
   
  }

  loggedInUser():boolean{
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  isAdmin():boolean{
    return this.authService.isAdmin();
  }
}
