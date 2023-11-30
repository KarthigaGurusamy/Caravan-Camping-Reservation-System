import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Bookings } from 'src/app/model/bookings';
import { Profile } from 'src/app/model/profile';
import { BookingsService } from 'src/app/service/bookings.service';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent {
  options: AnimationOptions = {
    path: '/assets/profile.json',
  };

  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };

  bookingList: Bookings[] = [];

  profile: Profile = {
    id: 0,
    dateOfBirth: new Date(),
    phoneNumber: 0,
    gender: '',
    userId:0,
  };

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (response: AppResponse) => {
        this.profile = response.data;
        let date: Date = this.profile.dateOfBirth;
        console.log(date.toLocaleDateString());
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
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

  getLoggedInUser(): AppUser {
    return this.storageService.getLoggedInUser();
  }

  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

  resetProfileForm(profileForm: NgForm,id:number)
  {
    profileForm.resetForm(this.profile);
  }

  editProfile(profileForm: NgForm,id:number) {
    let profile: Profile = {
      id:id,
      dateOfBirth: profileForm.value.dateOfBirth,
      phoneNumber: profileForm.value.phoneNumber,
      gender: profileForm.value.gender,
      userId: this.storageService.getLoggedInUser().id!,
    };
    this.profileService.editProfile(profile).subscribe({
      next: (response: AppResponse) => {
        this.profile = response.data;
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

  getDate(date:any):String{
    return new Date(date).toISOString().split('T')[0];
  }
}
