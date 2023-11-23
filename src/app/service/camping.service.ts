import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Camping } from '../model/camping';

@Injectable({
  providedIn: 'root',
})
export class CampingService {
 
  constructor(private httpClient: HttpClient) {}

  getCampings(): Observable<AppResponse> {
    
    return this.httpClient.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/camping/all`);
  }

  getHomeCampings(): Observable<AppResponse> {
    
    return this.httpClient.get<AppResponse>(`${urlEndpoint.baseUrl}/home/camping/all`);
  }

  addCampings(camping:Camping) : Observable<AppResponse>{
    return this.httpClient.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/camping/create`,camping);

  }

  deleteCamping(id:number) : Observable<AppResponse>{
    return this.httpClient.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/camping/delete/${id}`);

  }
}
