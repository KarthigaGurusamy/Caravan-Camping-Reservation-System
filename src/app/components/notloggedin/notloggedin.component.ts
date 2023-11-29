import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notloggedin',
  templateUrl: './notloggedin.component.html',
  styleUrls: ['./notloggedin.component.css'],
})
export class NotloggedinComponent {
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((param) => {
      let isUser: boolean = param['isUser'];
      const myModal = document.getElementById('new') as HTMLDivElement;
      const myInput = document.getElementById('myInput') as HTMLElement;

      myModal.addEventListener('shown.bs.modal', () => {
        myInput.focus()
      })
    });
  }
}
