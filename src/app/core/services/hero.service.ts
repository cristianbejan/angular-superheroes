import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class HeroService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getHeroes(): Observable<Hero[]> {
    const url = `${this.baseUrl}/heroes`;

    return this.http.get<Hero[]>(url);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.baseUrl}/heroes/${id}`;

    return this.http.get<Hero>(url);
  }

  deleteHero(hero: Hero): Observable<void> {
    const url = `${this.baseUrl}/heroes/${hero.id}`;

    return this.http.delete<void>(url);
  }

  updateHeroSuperpowersIds(
    payload: Partial<Hero>,
    id: number
  ): Observable<Hero> {
    // updateHeroSuperpowersIds(
    //   payload: Partial<Hero> & Required<{ id: number }>
    // ): Observable<Hero> {
    const url = `${this.baseUrl}/heroes/${id}`;

    return this.http.patch<Hero>(url, payload, httpOptions);
  }

  addNewHero(payload: Hero): Observable<Hero> {
    const url = `${this.baseUrl}/heroes`;

    return this.http.post<Hero>(url, payload, httpOptions);
  }

  updateHero(payload: Hero, id: number): Observable<Hero> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.patch<Hero>(url, payload, httpOptions);
  }
}
