import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { Location } from 'src/app/model/location';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) {}

  getLocations(): Observable<AppResponse> {
    
    return this.httpClient.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/location/all`);
  }

  getHomeLocations(): Observable<AppResponse> {
    
    return this.httpClient.get<AppResponse>(`${urlEndpoint.baseUrl}/home/location/all`);
  }

  addLocation(location:Location) : Observable<AppResponse>{
    console.log(location);
    return this.httpClient.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/location/create`,location);
    
  }

  deleteLocation(id:number) : Observable<AppResponse>{
    return this.httpClient.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/location/delete/${id}`);

  }

}
