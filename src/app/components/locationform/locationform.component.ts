import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Location } from 'src/app/model/location';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-locationform',
  templateUrl: './locationform.component.html',
  styleUrls: ['./locationform.component.css'],
})
export class LocationformComponent {
  constructor(private locationService: LocationService,private router: Router) {}

  error: string = '';
  onSubmit(locationForm: NgForm) {

    let location: Location = {
      id:0,
      address: locationForm.value.address,
      campingId: 2,
      caravanName: locationForm.value.caravanName,
      caravanCapacity: parseInt(locationForm.value.caravanCapacity),
      price: parseFloat(locationForm.value.price),
      stayCount: parseInt(locationForm.value.stayCount),
    } ;

    this.locationService.addLocation(location).subscribe({
      next: (response: AppResponse) => {
        this.router.navigate(['/adminlocations'],{ replaceUrl: true });
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
