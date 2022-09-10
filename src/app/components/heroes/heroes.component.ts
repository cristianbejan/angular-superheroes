import { Component, OnInit } from '@angular/core';

import { Hero, Superpower } from 'src/app/core/interfaces';
import { HeroService, SuperpowerService } from 'src/app/core/services';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  allSuperpowers: Superpower[];

  constructor(
    private heroService: HeroService,
    private superpowerService: SuperpowerService
  ) {}

  ngOnInit(): void {
    this.getSuperheroes();
    this.getAllSuperpowers();
  }

  getSuperheroes() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  getAllSuperpowers() {
    this.superpowerService
      .getSuperpowers()
      .subscribe((superpowers) => (this.allSuperpowers = superpowers));
  }

  addNewSuperhero(hero: Hero) {
    this.heroService.addNewHero(hero).subscribe((h) => this.heroes.push(h));
  }

  deleteHero(hero: Hero) {
    if (confirm('Are you sure?') === true) {
      this.heroService.deleteHero(hero).subscribe(() => {
        this.getSuperheroes();
      });
    }

    //    if (confirm('Are you sure?') === true) {
    //     this.heroService.deleteHero(hero).subscribe(() => {
    //       this.heroStore.deleteHero(hero.id);
    //       this.getSuperheroes();
    //     });
    //   }
    // }
  }
}
