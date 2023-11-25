import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Staff } from 'src/app/model/staff';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-staffform',
  templateUrl: './staffform.component.html',
  styleUrls: ['./staffform.component.css']
})
export class StaffformComponent {

  constructor(private staffService: StaffService,private router: Router) {}

  onSubmit(staffForm:NgForm)
  {
    let staff: Staff = {
      id:0,
      staffName:staffForm.value.staffName,
      locationId:4
    } ;

    this.staffService.addStaff(staff).subscribe({
      next: (response: AppResponse) => {
        this.router.navigate(['/admin/staff'],{ replaceUrl: true });
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  }

