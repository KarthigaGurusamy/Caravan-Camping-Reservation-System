import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Observable } from 'rxjs';
import { AppUser } from '../model/appUser';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getUserProfile(): Observable<AppResponse> {
    let user: AppUser = this.storageService.getLoggedInUser();
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/profile/${user.id}`
    );
  }
  editProfile(profile: Profile): Observable<AppResponse> {
    if (profile.id === 0) {
      return this.httpClient.post<AppResponse>(
        `${urlEndpoint.baseUrl}/user/profile/create`,
        profile
      );
    } else {
      return this.httpClient.put<AppResponse>(
        `${urlEndpoint.baseUrl}/user/profile/update`,
        profile
      );
    }
  }
}
