import { Component, OnInit } from '@angular/core';

import { Hero, Superpower } from 'src/app/core/interfaces';
import { HeroService, SuperpowerService } from 'src/app/core/services';
import { HeroStoreService } from 'src/app/store/hero-store.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  allSuperpowers: Superpower[];
  heroToBeEdited: Hero = null;

  constructor(
    private heroService: HeroService,
    private superpowerService: SuperpowerService,
    private heroStore: HeroStoreService
  ) {}

  ngOnInit(): void {
    this.getSuperheroes();
    this.getAllSuperpowers();
  }

  getSuperheroes() {
    // this.heroService.goeetHers().subscribe((heroes) => (this.heroes = heroes));
    this.heroStore.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
  getAllSuperpowers() {
    this.superpowerService
      .getSuperpowers()
      .subscribe((superpowers) => (this.allSuperpowers = superpowers));
  }

  // addNewSuperhero(hero: Hero) {
  //   // this.heroService.addNewHero(hero).subscribe((h) => this.heroes.push(h));
  //   // this.heroService.addNewHero(hero).subscribe((newHero) => {
  //   //   this.heroStore.addNewHero(newHero);
  //   // });
  //   this.heroStore.addNewHero(hero);
  // }

  deleteHero(hero: Hero) {
    // if (confirm('Are you sure?') === true) {
    //   this.heroService.deleteHero(hero).subscribe(() => {
    //     this.getSuperheroes();
    //   });
    // }

    if (confirm('Are you sure?')) {
      this.heroService.deleteHero(hero).subscribe(() => {
        this.heroStore.deleteHero(hero.id);
        this.getSuperheroes();
      });
    }
  }

  editHero(hero: Hero) {
    this.heroToBeEdited = hero;
  }

  onFormClose() {
    this.heroToBeEdited = null;
  }
}
