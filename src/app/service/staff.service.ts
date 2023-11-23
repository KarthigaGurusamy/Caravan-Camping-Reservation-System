import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Staff } from '../model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient: HttpClient) {}

  getStaffs(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/staff/all`);
  }

  addStaff(staff:Staff) : Observable<AppResponse>{
    console.log(staff);
    return this.httpClient.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/staff/allocate`,staff);
    
  }
}
