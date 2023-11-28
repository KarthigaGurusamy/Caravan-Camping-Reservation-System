import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Observable } from 'rxjs';
import { AppUser } from '../model/appUser';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient, private storageService:StorageService) {}

  getUserProfile(): Observable<AppResponse> {
    let user : AppUser = this.storageService.getLoggedInUser()
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/profile/${user.id}`
    );
  }
}
