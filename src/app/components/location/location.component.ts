import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Bookings } from 'src/app/model/bookings';
import { Location } from 'src/app/model/location';
import { Userbooking } from 'src/app/model/userbooking';
import { AuthService } from 'src/app/service/auth.service';
import { BookingsService } from 'src/app/service/bookings.service';
import { LocationService } from 'src/app/service/location.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {
  locationList: Location[] = [];

  count: string = '';

  countArr: number[] = [];

  lottieOptions: AnimationOptions = {
    path: 'assets/bookingsuccess.json',
    loop: true,
    autoplay: false,
  };

  playAnimation() {
    this.lottieOptions.autoplay = !this.lottieOptions.autoplay;
  }

  options: AnimationOptions = {
    path: '/assets/success.json',
  };

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storageService: StorageService,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      let id: number = param['id'];
      this.locationService.getHomeLocations(id).subscribe({
        next: (response: AppResponse) => {
          this.locationList = response.data;
          console.log(this.locationList);
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    });
  }

  isStaff(id: number): boolean {
    let Staff: boolean = false;
    for (let item of this.locationList) {
      if (item.staff?.id === id) {
        Staff = true;
        break;
      }
    }
    return Staff;
  }
  getStaff(id: number): String {
    let Staff: String = '';
    for (let item of this.locationList) {
      if (item.staff?.id === id) {
        Staff = item.staff.staffName;
        break;
      }
    }
    return Staff;
  }

  checkDate(): String {
    return 'Date are available';
  }

  onSubmit(bookingForm: NgForm, id: number): void {
    let booking: Userbooking = {
      userId: this.storageService.getLoggedInUser().id,
      locationId: id,
      fromDate: bookingForm.value.fromDate,
      toDate: bookingForm.value.toDate,
    };
    this.bookingService.addUserBooking(booking).subscribe({
      next: (response: AppResponse) => {
        
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  loggedInUser():boolean{
    return this.authService.isLoggedIn();
  }
}
