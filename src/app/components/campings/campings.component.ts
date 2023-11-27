import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Camping } from 'src/app/model/camping';
import { AuthService } from 'src/app/service/auth.service';
import { CampingService } from 'src/app/service/camping.service';

@Component({
  selector: 'app-campings',
  templateUrl: './campings.component.html',
  styleUrls: ['./campings.component.css']
})
export class CampingsComponent {
  campingList : Camping[]=[];

  constructor(private campingService : CampingService, private router:Router,private authService:AuthService){}

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
