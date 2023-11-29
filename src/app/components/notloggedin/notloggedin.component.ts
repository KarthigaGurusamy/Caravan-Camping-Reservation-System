import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('open', { read: ElementRef }) closeRef!: ElementRef;
  @ViewChild('close', { read: ElementRef }) modelRef!: ElementRef;

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((param) => {});

    this.modelRef.nativeElement.click();
  }
}
