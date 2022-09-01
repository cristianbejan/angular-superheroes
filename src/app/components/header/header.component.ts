import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero, Superpower } from 'src/app/core/interfaces';

enum AddNewSuperheroBtnState {
  SHOW = 'Add new superhero',
  HIDE = 'Hide form',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() allSuperpowers: Superpower[];

  @Output() addingNewHero: EventEmitter<Hero> = new EventEmitter();

  formVisible: boolean = false;
  addNewSuperheroBtnText: string = AddNewSuperheroBtnState.SHOW;

  constructor() {}

  ngOnInit(): void {}

  addNewHero(hero: Hero) {
    this.addingNewHero.emit(hero);
  }

  toggleAddNewSuperhero() {
    this.formVisible = !this.formVisible;
    this.addNewSuperheroBtnText = this.formVisible
      ? AddNewSuperheroBtnState.HIDE
      : AddNewSuperheroBtnState.SHOW;
  }
}
