import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero, Superpower } from 'src/app/core/interfaces';
import { SuperpowerService, HeroService } from 'src/app/core/services';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.css'],
})
export class HeroItemComponent implements OnInit {
  @Input()
  hero: Hero;

  // @Input() allSuperpowers: Superpower[];

  @Input()
  set allSuperpowers(data: Superpower[]) {
    if (data) {
      this._allSuperpowers = data;
      this.getUnassignedSuperpowers(this.allSuperpowers);
    }
  }

  @Output() deleteSuperhero: EventEmitter<Hero> = new EventEmitter();

  get allSuperpowers(): Superpower[] {
    return this._allSuperpowers;
  }

  private _allSuperpowers: Superpower[];

  superpowers: Superpower[];
  notAssignedSuperpowers: Superpower[];

  constructor(
    private superpowerService: SuperpowerService,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getSuperpowers();
  }

  getSuperpowers() {
    if (this.hero.superpowerIds.length) {
      this.superpowerService
        .getSuperpowersByIds(this.hero.superpowerIds)
        .subscribe((data) => (this.superpowers = data));
    } else {
      this.superpowers = [];
    }
  }

  getUnassignedSuperpowers(allSuperpowers: Superpower[] = this.allSuperpowers) {
    if (this.hero.superpowerIds.length) {
      this.notAssignedSuperpowers = allSuperpowers.filter(
        (superpower) => !this.hero.superpowerIds.includes(superpower.id)
      );
    } else {
      this.notAssignedSuperpowers = allSuperpowers;
    }
  }

  deleteSuperpower(superpowerId: number) {
    const payload = {
      superpowerIds: this.hero.superpowerIds.filter(
        (id) => id !== superpowerId
      ),
    };

    this.heroService
      .updateHeroSuperpowersIds(payload, this.hero.id)
      .subscribe((updatedHero: Hero) => {
        this.hero = updatedHero;
        this.getSuperpowers();
        this.getUnassignedSuperpowers();
      });
  }

  updateSuperpowers(newSupoerpowers: number[]) {
    const payload = {
      superpowerIds: [...this.hero.superpowerIds, ...newSupoerpowers],
    };

    this.heroService
      .updateHeroSuperpowersIds(payload, this.hero.id)
      .subscribe((updatedHero: Hero) => {
        this.hero = updatedHero;
        this.getSuperpowers();
        this.getUnassignedSuperpowers();
      });
  }

  onDelete(hero: Hero) {
    this.deleteSuperhero.emit(hero);
  }
}
