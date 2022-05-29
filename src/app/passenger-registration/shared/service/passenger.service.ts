import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { Passenger } from '../models/passenger-registration.model';

@Injectable()
export class PassengerService {

  constructor(private http: HttpClient) { }

  public savePassenger = (body: Passenger[]): Observable<Passenger[]> => {
    return this.http.post<Passenger[]>(`${environment.url_base}/Passenger`, body.length === 0 ? {} : body);
  }

  public getPassenger = (): Observable<Passenger[]> => {
    return this.http.get<Passenger[]>(`${environment.url_base}/Passenger`);
  }
}
