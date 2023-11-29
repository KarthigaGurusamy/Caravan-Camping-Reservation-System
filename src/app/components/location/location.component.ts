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
  error: String = '';
  numberOfPersons: number = 1;
  persons: Person[] = [];
  fromDate: String = '';
  toDate: String = '';
  isDateAvailable: boolean = false;

  todayDate:any;

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
    this.todayDate=new Date();
    this.route.queryParams.subscribe((param) => {
      let id: number = param['id'];
      console.log(id);
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

  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
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

  onSubmit(bookingForm: NgForm, id: number): void {
    console.log(bookingForm.value);
    
    let booking: Userbooking = {
      userId: this.storageService.getLoggedInUser().id,
      locationId: id,
      fromDate: bookingForm.value.fromDate,
      toDate: bookingForm.value.toDate,
    };
    this.bookingService.addUserBooking(booking).subscribe({
      next: (response: AppResponse) => {
        this.error='';
        this.isDateAvailable=false;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  isAdmin():boolean{
    return this.authService.isAdmin();
  }

  checkDates(bookingForm: NgForm,id:number): void {

    let value ={
      fromDate:bookingForm.value.fromDate,
      toDate:bookingForm.value.toDate,
      locationId:id
    }

    this.bookingService.checkDateAvailability(value).subscribe({
      next: (response: AppResponse) => {
        this.isDateAvailable = response.data;

        if (this.isDateAvailable) {
          this.error = 'Woah..Dates are available! Click confirm to book..';
        } else {
          this.error =
            'Oops!! The dates are not available choose another date..';
          bookingForm.reset();
        }
      },
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
