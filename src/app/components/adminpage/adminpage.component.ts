import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Bookings } from 'src/app/model/bookings';
import { BookingsService } from 'src/app/service/bookings.service';
import { CampingService } from 'src/app/service/camping.service';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent {
  totalCampings: number = 0;
  totalLocations: number = 0;
  toatalBookings: number = 0;
  bookingList: Bookings[] = [];


  constructor(
    private campingService: CampingService,
    private locationService: LocationService,
    private bookingService: BookingsService
  ) {}

  options: AnimationOptions = {
    path: '/assets/dashboard.json',
  };

  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };


  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
      next: (response: AppResponse) => {
        this.totalLocations=response.data.length;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    this.campingService.getCampings().subscribe({
      next: (response: AppResponse) => {
        this.totalCampings=response.data.length;

      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    this.bookingService.getBookings().subscribe({
      next: (response: AppResponse) => {
        this.toatalBookings=response.data.length;
        this.bookingList=response.data;

      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  getDate(date:any):String{
    return new Date(date).toISOString().split('T')[0];
  }
}
