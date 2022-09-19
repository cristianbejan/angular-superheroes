import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class HeaderComponent implements OnInit, OnChanges {
  @Input() allSuperpowers: Superpower[];
  @Input() heroToBeEdited: Hero;

  @Output() close = new EventEmitter<void>();

  // @Output() addingNewHero: EventEmitter<Hero> = new EventEmitter();

  formVisible: boolean = false;
  addNewSuperheroBtnText: string = AddNewSuperheroBtnState.SHOW;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.formVisible = Boolean(changes['heroToBeEdited']?.currentValue);
    this.formVisible = !!changes['heroToBeEdited']?.currentValue;
    this.updateNewSuperheroBtnText();

    // if (changes['heroToBeEdited']?.currentValue) {
    //   this.formVisible = true;
    // } else {
    //   this.formVisible = false;
    // }
  }

  // addNewHero(hero: Hero) {
  //   this.addingNewHero.emit(hero);
  // }

  toggleAddNewSuperhero() {
    this.formVisible = !this.formVisible;
    this.updateNewSuperheroBtnText();
    if (!this.formVisible) {
      this.close.emit();
    }
  }

  private updateNewSuperheroBtnText() {
    this.addNewSuperheroBtnText = this.formVisible
      ? AddNewSuperheroBtnState.HIDE
      : AddNewSuperheroBtnState.SHOW;
  }
}
