import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Bookings } from 'src/app/model/bookings';
import { AuthService } from 'src/app/service/auth.service';
import { BookingsService } from 'src/app/service/bookings.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-adminuserdetails',
  templateUrl: './adminuserdetails.component.html',
  styleUrls: ['./adminuserdetails.component.css'],
})
export class AdminuserdetailsComponent {
  users: AppUser[] = [];
  bookings:Bookings[]=[];

  constructor(
    private authService: AuthService,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (response: AppResponse) => {
        this.users = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    this.bookingService.getFirstUserBookings(1).subscribe({
      next: (response: AppResponse) => {
        this.bookings = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  isAdmin(user: AppUser): boolean {
    if (user.role === CONSTANT.ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  getUserBookings(user:AppUser):void{
    this.bookingService.getUserBookingDetails(user).subscribe({
      next: (response: AppResponse) => {
        this.bookings = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
