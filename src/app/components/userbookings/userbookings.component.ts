import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Bookings } from 'src/app/model/bookings';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-userbookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css']
})
export class UserbookingsComponent {
  bookingList: Bookings[] = [];

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.bookingsService.getUserBookings().subscribe({
      next: (response: AppResponse) => {
        this.bookingList = response.data;
        // console.log(this.locationList);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  deleteBooking(id:number):void{
    this.bookingsService.deleteBooking(id).subscribe({
      next: (response: AppResponse) => {
        this.bookingList = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
