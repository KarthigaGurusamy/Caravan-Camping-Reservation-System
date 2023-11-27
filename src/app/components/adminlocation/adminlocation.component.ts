import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { LocationService } from 'src/app/service/location.service';
import { Location } from 'src/app/model/location';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Camping } from 'src/app/model/camping';
import { CampingService } from 'src/app/service/camping.service';

@Component({
  selector: 'app-adminlocation',
  templateUrl: './adminlocation.component.html',
  styleUrls: ['./adminlocation.component.css'],
})
export class AdminlocationComponent {
  locationList: Location[] = [];
  editId: number = 0;
  button: String = 'Add';
  campingList: Camping[] = [];

  file = '';

  constructor(
    private locationService: LocationService,
    private router: Router,
    private campingService: CampingService
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
    this.campingService.getCampings().subscribe({
      next: (response: AppResponse) => {
        this.campingList = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  onSubmit(locationForm: NgForm) {
    console.log(locationForm.value);
    // let location: Location = {
    //   id: this.editId,
    //   address: locationForm.value.address,
    //   name:locationForm.value.name,
    //   campingId: parseInt(locationForm.value.campingId),
    //   caravanName: locationForm.value.caravanName,
    //   caravanCapacity: parseInt(locationForm.value.caravanCapacity),
    //   price: parseFloat(locationForm.value.price),
    //   stayCount: parseInt(locationForm.value.stayCount),
    // };

    const formData = new FormData();
    formData.append('photo', this.file);
    formData.append('id', this.editId.toString());
    formData.append('address', locationForm.value.address);
    formData.append('name', locationForm.value.name);
    formData.append('campingId', locationForm.value.campingId);
    formData.append('caravanName', locationForm.value.caravanName);
    formData.append('caravanCapacity', locationForm.value.caravanCapacity);
    formData.append('price', locationForm.value.price);
    formData.append('stayCount', locationForm.value.stayCount);

    this.locationService.addLocation(formData, this.editId).subscribe({
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
          name: response.data.name,
          campingId: parseInt(response.data.campingId),
          caravanName: response.data.caravanName,
          caravanCapacity: response.data.caravanCapacity,
          price: response.data.price,
          stayCount: response.data.stayCount,
        };
        locationForm.resetForm(value);
        this.button = 'Edit';
        this.editId = response.data.id;
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

  reset(locationForm: NgForm) {
    locationForm.reset();
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      // console.log('Selected file',this.file);
    }
  }
}
