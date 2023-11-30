import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  options: AnimationOptions = {
    path: '/assets/welcome.json',
  };

  toatalBookings: number = 0;

  constructor(
 
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (response: AppResponse) => {
        this.toatalBookings=response.data.length;

      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
