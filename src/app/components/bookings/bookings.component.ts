import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Bookings } from 'src/app/model/bookings';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  bookingList: Bookings[] = [];

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.bookingsService.getBookings().subscribe({
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
}
