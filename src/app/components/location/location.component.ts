import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Location } from 'src/app/model/location';
import { Person } from 'src/app/model/person';
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

  numberOfPersons: number = 1;
  persons: Person[] = [];

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
      console.log(id);
      this.locationService.getHomeLocations(id).subscribe({
        next: (response: AppResponse) => {
          this.locationList = response.data;
          console.log(this.locationList);


          // for(let location of this.locationList){
          //   location.photo
          // }
          
          // const reader = new FileReader();
          // reader.onload = (e) => (this.image = e.target.result);
          // reader.readAsDataURL(new Blob([data]));



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
    let staff: boolean = false;
    for (let item of this.locationList) {
      if (item.id === id && item.staff !== null) {
        staff = true;
        break;
      }
    }

    return staff;
  }

  getStaff(id: number): String | undefined {
    let staff: String | undefined = '';
    for (let item of this.locationList) {
      if (item.id === id && item.staff !== null) {
        staff = item.staff?.staffName;
        break;
      }
    }
    return staff;
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
      next: (response: AppResponse) => {},
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  loggedInUser(): boolean {
    return this.authService.isLoggedIn();
  }

  generatePersons() {
    this.persons = Array.from({ length: this.numberOfPersons }, () =>
      this.createEmptyPerson()
    );
  }

  private createEmptyPerson(): Person {
    return { bookingId: 0, name: '', age: 0, gender: '' };
  }

  submitForm(personDetails: NgForm) {}
}
