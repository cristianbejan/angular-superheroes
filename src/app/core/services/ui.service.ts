import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showSelect: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleViewMoreSuperpowers(): void {
    this.showSelect = !this.showSelect;
    this.subject.next(this.showSelect);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
