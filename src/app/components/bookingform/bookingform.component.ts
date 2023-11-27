import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent {

  numberOfPersons: number = 1;
  persons: Person[] = [];

  generatePersons() {
    this.persons = Array.from({ length: this.numberOfPersons }, () =>
      this.createEmptyPerson()
    );
  }

  private createEmptyPerson(): Person {
    return {bookingId:0, name: '', age: 0, gender: '' };
  }

  submitForm(personDetails:NgForm) {
   
  }
}
