import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { LocationService } from 'src/app/service/location.service';
import { Location } from 'src/app/model/location';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adminlocation',
  templateUrl: './adminlocation.component.html',
  styleUrls: ['./adminlocation.component.css'],
})
export class AdminlocationComponent {
  locationList: Location[] = [];
  editId: number = 0;
  button: String = 'Add';

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

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

  onSubmit(locationForm: NgForm) {
    let location: Location = {
      id: this.editId,
      address: locationForm.value.address,
      campingId: 1,
      caravanName: locationForm.value.caravanName,
      caravanCapacity: parseInt(locationForm.value.caravanCapacity),
      price: parseFloat(locationForm.value.price),
      stayCount: parseInt(locationForm.value.stayCount),
    };

    this.locationService.addLocation(location).subscribe({
      next: (response: AppResponse) => {
        this.locationList = response.data;
        this.editId = 0;
        this.button = 'Add';
        locationForm.reset();
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  editLocation(id: number, locationForm: NgForm) {
    this.locationService.getLocationById(id).subscribe({
      next: (response: AppResponse) => {
        let value: Location = {
          id: response.data.id,
          address: response.data.address,
          campingId: 1,
          caravanName: response.data.caravanName,
          caravanCapacity: response.data.caravanCapacity,
          price: response.data.price,
          stayCount: response.data.stayCount,
        };
        locationForm.resetForm(value);
        this.button = 'Edit';
        this.editId=response.data.id;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  deleteLocation(id: number): void {
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

  reset(locationForm:NgForm)
  {
    locationForm.reset();
  }
}
