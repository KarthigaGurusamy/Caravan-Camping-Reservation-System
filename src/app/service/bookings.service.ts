import { Injectable } from '@angular/core';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';
import { Userbooking } from '../model/userbooking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {


  constructor(private httpClient: HttpClient, private storageService:StorageService) {}

  getBookings(): Observable<AppResponse> {
    
    return this.httpClient.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/booking/all`);
  }

  getUserBookings(): Observable<AppResponse> {

    let user: AppUser = this.storageService.getLoggedInUser();
    return this.httpClient.get<AppResponse>(`${urlEndpoint.baseUrl}/user/bookings/all/${user.id}`);
  }

  deleteBooking(id:number) : Observable<AppResponse>{
    return this.httpClient.delete<AppResponse>(`${urlEndpoint.baseUrl}/user/bookings/delete/${id}`);

  }

  addUserBooking(booking: Userbooking) {
    return this.httpClient.post<AppResponse>(`${urlEndpoint.baseUrl}/user/bookings/create`,booking);

  }
}
