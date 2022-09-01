import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Superpower } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SuperpowerService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getSuperpowers(): Observable<Superpower[]> {
    const url = `${this.baseUrl}/superpowers`;

    return this.http.get<Superpower[]>(url);
  }

  getSuperpowersByIds(ids: number[]): Observable<Superpower[]> {
    const url = `${this.baseUrl}/superpowers?${ids
      .map((id) => 'id=' + id)
      .join('&')}`;

    return this.http.get<Superpower[]>(url);
  }

  getSuperpower(id: number): Observable<Superpower> {
    const url = `${this.baseUrl}/superpowers/${id}`;

    return this.http.get<Superpower>(url);
  }

  deleteSuperpower(id: number): Observable<void> {
    const url = `${this.baseUrl}/superpowers/${id}`;

    return this.http.delete<void>(url);
  }
}
