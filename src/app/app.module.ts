import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroService } from './core/services/hero.service';
import { HeroItemComponent } from './components/hero-item/hero-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperpowerCardComponent } from './components/superpower-card/superpower-card.component';
import { AsignSuperpowerFormComponent } from './components/asign-superpower-form/asign-superpower-form.component';
import { HeaderComponent } from './components/header/header.component';
import { AddHeroFormComponent } from './components/add-hero-form/add-hero-form.component';
import { HeroStoreService } from './store/hero-store.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroItemComponent,
    SuperpowerCardComponent,
    AsignSuperpowerFormComponent,
    HeaderComponent,
    AddHeroFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HeroService, HeroStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
