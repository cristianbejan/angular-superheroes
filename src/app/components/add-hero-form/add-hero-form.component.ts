import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Superpower } from 'src/app/core/interfaces';
import { HeroStoreService } from 'src/app/store/hero-store.service';

enum FormSubmitState {
  ADD = 'Add superhero',
  EDIT = 'Update superhero',
}

@Component({
  selector: 'app-add-hero-form',
  templateUrl: './add-hero-form.component.html',
  styleUrls: ['./add-hero-form.component.css'],
})
export class AddHeroFormComponent implements OnInit, OnChanges {
  @Input() allSuperpowers: Superpower[];
  @Input() visible: boolean;
  @Input() heroToBeEdited: Hero;

  // @Output() onAddNewHero: EventEmitter<Hero> = new EventEmitter();

  addHeroForm = new FormGroup({
    realName: new FormControl('', Validators.required),
    superheroName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    superpowerIds: new FormControl(null, Validators.required),
  });

  submitButtonText: string = FormSubmitState.ADD;

  constructor(private heroStore: HeroStoreService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroToBeEdited']?.currentValue) {
      this.submitButtonText = FormSubmitState.EDIT;
      // populam inputurile din form
      this.addHeroForm.patchValue({
        realName: this.heroToBeEdited.realName,
        superheroName: this.heroToBeEdited.superheroName,
        imageUrl: this.heroToBeEdited.imageUrl,
        superpowerIds: this.heroToBeEdited.superpowerIds,
      });
    } else {
      this.submitButtonText = FormSubmitState.ADD;
    }

    if (changes['visible'] && changes['visible'].currentValue === false) {
      this._resetForm();
    }
  }

  onFormSubmit() {
    if (this.heroToBeEdited) {
      this.heroStore.updateHero(this.addHeroForm.value, this.heroToBeEdited.id);
    } else {
      this.heroStore.addNewHero(this.addHeroForm.value);
      // this.onAddNewHero.emit(this.addHeroForm.value);
    }

    this._resetForm();
  }

  private _resetForm() {
    this.addHeroForm.reset({
      realName: '',
      superheroName: '',
      imageUrl: '',
      superpowerIds: '',
    });
  }
}
