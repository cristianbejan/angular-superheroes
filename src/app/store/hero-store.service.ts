import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Hero } from '../core/interfaces';
import { HeroService } from '../core/services';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService {
  heroes$ = new BehaviorSubject<Hero[]>([]);
  private addHero$ = new Subject<Hero>();
  private deleteHero$ = new Subject<number>();

  constructor(private heroService: HeroService) {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes$.next(heroes);
    });

    this.addHero$.subscribe((newHero) => {
      this.heroes$.next([...this.heroes$.getValue(), newHero]);
    });

    this.deleteHero$.subscribe((id: number) => {
      this.heroes$.next(
        this.heroes$.getValue().filter((hero) => {
          return hero.id !== id;
        })
      );
    });
  }

  addNewHero(hero: Hero) {
    this.addHero$.next(hero);
  }

  deleteHero(id: number) {
    this.deleteHero$.next(id);
  }
}
