import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Superpower } from 'src/app/core/interfaces';

@Component({
  selector: 'app-add-hero-form',
  templateUrl: './add-hero-form.component.html',
  styleUrls: ['./add-hero-form.component.css'],
})
export class AddHeroFormComponent implements OnInit {
  @Input() allSuperpowers: Superpower[];
  @Input() visible: boolean;

  @Output() onAddNewHero: EventEmitter<Hero> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addHeroForm = new FormGroup({
    realName: new FormControl('', Validators.required),
    superheroName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    superpowerIds: new FormControl(null, Validators.required),
  });

  onFormSubmit() {
    this.onAddNewHero.emit(this.addHeroForm.value);

    this.addHeroForm.reset({
      realName: '',
      superheroName: '',
      imageUrl: '',
      superpowerIds: '',
    });
  }
}
