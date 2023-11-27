import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Location } from 'src/app/model/location';
import { Staff } from 'src/app/model/staff';
import { LocationService } from 'src/app/service/location.service';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  staffList : Staff[]=[];
  locationList:Location[]=[];


  constructor(private staffService : StaffService,private locationService:LocationService){
    this.locationService.getLocations().subscribe({
      next: (response: AppResponse) => {
        this.locationList=response.data;
        this.locationList = this.locationList.filter((item)=>item.staff===null);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  ngOnInit(): void {
    this.staffService.getStaffs().subscribe({
      next: (response: AppResponse) => {
        this.staffList = response.data;
        console.log(this.staffList);
        
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  onSubmit(staffForm:NgForm)
  {
    let staff: Staff = {
      id:0,
      staffName:staffForm.value.staffName,
      locationId:staffForm.value.locationId
    } ;

    this.staffService.addStaff(staff).subscribe({
      next: (response: AppResponse) => {
        this.staffList=response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }


  
  reset(staffForm:NgForm)
  {
    staffForm.reset();
  }

}
