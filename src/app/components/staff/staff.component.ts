import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Staff } from 'src/app/model/staff';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  staffList : Staff[]=[];

  constructor(private staffService : StaffService){}

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

}
