import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Camping } from 'src/app/model/camping';
import { Location } from 'src/app/model/location';
import { Login } from 'src/app/model/login';
import { AuthService } from 'src/app/service/auth.service';
import { CampingService } from 'src/app/service/camping.service';
import { LocationService } from 'src/app/service/location.service';
import { StorageService } from 'src/app/service/storage.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  campingList: Camping[] = [];
  locationList: Location[] = [];

  username: String = '';
  password: String = '';
  error: String = '';
  response: boolean = false;

  constructor(
    private campingService: CampingService,
    private locationService: LocationService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.campingService.getHomeCampings().subscribe({
      next: (response: AppResponse) => {
        this.campingList = response.data.slice(0, 6);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    this.locationService.getHomeLocations(0).subscribe({
      next: (response: AppResponse) => {
        this.locationList = response.data.slice(0, 6);
        console.log(this.campingList);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  getHomeLocations(id: number) {
    this.router.navigate(['/location'], { queryParams: { id: id } });
  }

  loggedInUser(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
