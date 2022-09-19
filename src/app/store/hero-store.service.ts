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
  private updateHero$ = new Subject<Hero>();
  private deleteHero$ = new Subject<number>();

  constructor(private heroService: HeroService) {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes$.next(heroes);
    });

    this.addHero$.subscribe((newHero) => {
      this.heroes$.next([...this.heroes$.getValue(), newHero]);
    });

    this.updateHero$.subscribe((updatedHero) => {
      const updatedHeroes = [];
      this.heroes$.getValue().forEach((hero) => {
        hero.id === updatedHero.id
          ? updatedHeroes.push(updatedHero)
          : updatedHeroes.push(hero);
      });
      this.heroes$.next(
        // this.heroes$.getValue().map((hero) => {
        //   return hero.id === updatedHero.id ? updatedHero : hero;
        // })
        updatedHeroes
      );
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
    this.heroService.addNewHero(hero).subscribe((hero) => {
      this.addHero$.next(hero);
    });
  }

  updateHero(payload: Hero, id: number) {
    this.heroService.updateHero(payload, id).subscribe((updatedHero) => {
      this.updateHero$.next(updatedHero);
    });
  }

  deleteHero(id: number) {
    this.deleteHero$.next(id);
  }
}
