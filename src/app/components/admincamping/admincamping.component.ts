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

  camping: Camping = {
    id: 0,
    campingName: '',
    description: '',
  };

  button: String = 'Add';
  editId: number = 0;

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
    let camp: Camping = {
      id: this.editId,
      campingName: campingForm.value.campingName,
      description: campingForm.value.description,
    };
    this.campingService.addCampings(camp).subscribe({
      next: (response: AppResponse) => {
        this.campingList = response.data;
        campingForm.reset();
        this.editId = 0;
        this.button = 'Add';
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  editCamping(id: number, campingForm: NgForm): void {
    this.campingService.getCampingById(id).subscribe({
      next: (response: AppResponse) => {
        let value: Camping = {
          id: response.data.id,
          campingName: response.data.campingName,
          description: response.data.description,
        };
        campingForm.resetForm(value);
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

  deleteCamping(id: number): void {
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
