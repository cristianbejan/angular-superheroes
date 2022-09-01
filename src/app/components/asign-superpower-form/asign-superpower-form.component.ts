import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Superpower } from 'src/app/core/interfaces';

@Component({
  selector: 'app-asign-superpower-form',
  templateUrl: './asign-superpower-form.component.html',
  styleUrls: ['./asign-superpower-form.component.css'],
})
export class AsignSuperpowerFormComponent implements OnInit {
  @Input() notAssignedSuperpowers: Superpower[];
  @Input() visible: boolean;

  @Output() addNewSuperpowers: EventEmitter<number[]> = new EventEmitter();

  newSuperpowers = new FormControl(null, Validators.required);
  newAddedSuperpowers: number[];

  constructor() {}

  ngOnInit(): void {
    this.newSuperpowers.valueChanges.subscribe();
  }

  onAddNewSuperpowersToHero() {
    this.addNewSuperpowers.emit(this.newSuperpowers.value);
  }
}
