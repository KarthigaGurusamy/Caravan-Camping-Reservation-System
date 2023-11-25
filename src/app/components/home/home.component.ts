import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Camping } from 'src/app/model/camping';
import { CampingService } from 'src/app/service/camping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  campingList : Camping[]=[];

  constructor(private campingService : CampingService, private router:Router){}

  ngOnInit(): void {
    this.campingService.getHomeCampings().subscribe({
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

  getHomeLocations(id:number)
  {
    this.router.navigate(['/location'],{queryParams:{id:id}});
  }

}
