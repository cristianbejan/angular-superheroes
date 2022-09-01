import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Superpower } from 'src/app/core/interfaces';

enum MoreSuperpowerBtnState {
  SHOW = 'Add more superpowers',
  HIDE = 'Hide superpowers',
}

@Component({
  selector: 'app-superpower-card',
  templateUrl: './superpower-card.component.html',
  styleUrls: ['./superpower-card.component.css'],
})
export class SuperpowerCardComponent implements OnInit {
  @Input() heroSuperpowersList: Superpower[];
  @Input() notAssignedSuperpowers: Superpower[];

  @Output() onDeleteSuperpower: EventEmitter<Superpower> = new EventEmitter();
  @Output() addingNewSuperpowers: EventEmitter<number[]> = new EventEmitter();

  moreSuperpowersVisible: boolean = false;
  moreSuperpowerBtnText: string = MoreSuperpowerBtnState.SHOW;

  constructor() {}

  ngOnInit(): void {}

  onDelete(power) {
    this.onDeleteSuperpower.emit(power);
  }

  toggleMoreSuperpowers() {
    this.moreSuperpowersVisible = !this.moreSuperpowersVisible;
    this.moreSuperpowerBtnText = this.moreSuperpowersVisible
      ? MoreSuperpowerBtnState.HIDE
      : MoreSuperpowerBtnState.SHOW;
  }

  addNewSuperpowers(superpowerIds) {
    this.addingNewSuperpowers.emit(superpowerIds);
  }
}
