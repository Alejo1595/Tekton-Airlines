import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passenger-registration.model';

@Injectable()
export class PassengerService {

  constructor(private http: HttpClient) { }

  public savePassenger = (body: Passenger) => {
    this.http.post('http://localhost:3000/Passenger', body).subscribe(res => console.log(res));
  }

  public getPassenger = (): Observable<Passenger[]> => {
    return this.http.get<Passenger[]>('http://localhost:3000/Passenger');
  }
}
