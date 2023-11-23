import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLoggedInUser(user: AppUser): void {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  }

  public removeLoggedInUser(): void {
    sessionStorage.removeItem('loggedInUser');
  }
}
