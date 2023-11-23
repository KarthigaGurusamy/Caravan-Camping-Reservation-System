import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Location } from 'src/app/model/location';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {

  locationList : Location[]=[];
  
  lottieOptions: AnimationOptions = {
    path: 'assets/bookingsuccess.json',
    loop: true,
    autoplay: false,
  };

  playAnimation() {
    this.lottieOptions.autoplay = !this.lottieOptions.autoplay;
  }


  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getHomeLocations().subscribe({
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
  }

  isStaff(id:number):boolean{
    let Staff : boolean = false;
    for(let item of this.locationList)
    {
      if(item.staff?.id===id)
      {
          Staff = true;break;
      }
    }
    return Staff;
  }
  getStaff(id:number):String{
    let Staff : String = "";
    for(let item of this.locationList)
    {
      if(item.staff?.id===id)
      {
          Staff = item.staff.staffName;break;
      }
    }
    return Staff;
  }
}
