import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { Catalog } from '../models/catalog.model';

@Injectable()
export class CatalogService {

  constructor(private http: HttpClient) { }


  public getCatalog(name: string): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${environment.url_base}/${name}`)
  }
}
