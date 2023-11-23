import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Camping } from 'src/app/model/camping';
import { CampingService } from 'src/app/service/camping.service';

@Component({
  selector: 'app-admincamping',
  templateUrl: './admincamping.component.html',
  styleUrls: ['./admincamping.component.css'],
})
export class AdmincampingComponent implements OnInit {
  campingList: Camping[] = [];

  constructor(private campingService: CampingService) {}

  ngOnInit(): void {
    this.campingService.getCampings().subscribe({
      next: (response: AppResponse) => {
        this.campingList = response.data;
        console.log(this.campingList);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  error: string = '';
  onSubmit(campingForm: NgForm) {
    console.log(campingForm.value);
    this.campingService.addCampings(campingForm.value).subscribe({
      next: (response: AppResponse) => {
        this.campingList = response.data;
        campingForm.reset();
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  deleteCamping(id:number):void{
    this.campingService.deleteCamping(id).subscribe({
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
}
