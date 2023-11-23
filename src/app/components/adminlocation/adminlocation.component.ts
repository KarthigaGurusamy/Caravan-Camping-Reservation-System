import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { LocationService } from 'src/app/service/location.service';
import { Location } from 'src/app/model/location';

@Component({
  selector: 'app-adminlocation',
  templateUrl: './adminlocation.component.html',
  styleUrls: ['./adminlocation.component.css'],
})
export class AdminlocationComponent {

  locationList: Location[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
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

  deleteCamping(id:number):void{
    this.locationService.deleteLocation(id).subscribe({
      next: (response: AppResponse) => {
        this.locationList = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
