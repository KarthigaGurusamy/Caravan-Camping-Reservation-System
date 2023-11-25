import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { Location } from 'src/app/model/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  getLocations(): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/location/all`
    );
  }

  getHomeLocations(id:number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/home/camping-location/${id}`
    );
  }

  addLocation(location: Location): Observable<AppResponse> {
    if (location.id === 0) {
      return this.httpClient.post<AppResponse>(
        `${urlEndpoint.baseUrl}/admin/location/create`,
        location
      );
    } else {
      console.log(location.id);
      return this.httpClient.put<AppResponse>(
        `${urlEndpoint.baseUrl}/admin/location/update`,
        location
      );
    }
  }

  deleteLocation(id: number): Observable<AppResponse> {
    return this.httpClient.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/location/delete/${id}`
    );
  }

  getLocationById(id: number): Observable<AppResponse> {
    return this.httpClient.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/location/${id}`
    );
  }
}
