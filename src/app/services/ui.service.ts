import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UiService {
  private showUsers: boolean = false;
  private subject = new Subject<any>();

  private isReadonly: boolean = true;

  constructor() { }

  toggleShowUser(): void {
    this.showUsers = !this.showUsers;
    this.subject.next(this.showUsers); 
  }

  handleReadonly(): void {
    this.isReadonly = !this.isReadonly;
    this.subject.next(this.isReadonly); 
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
