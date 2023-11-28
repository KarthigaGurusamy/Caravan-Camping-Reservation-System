import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Profile } from 'src/app/model/profile';
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

  profile: Profile = {
    id: 0,
    dateOfBirth: new Date(),
    phoneNumber: 0,
    gender: '',
  };

  constructor(private profileService: ProfileService,private storageService:StorageService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (response: AppResponse) => {
        this.profile = response.data;
        let date:Date = this.profile.dateOfBirth;
        console.log(date.toLocaleDateString());
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  getLoggedInUser():AppUser{
    return this.storageService.getLoggedInUser();
  }
}
