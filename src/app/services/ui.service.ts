import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface toggleGroupUsers {
  initState: boolean,
  showUsers: boolean,
  titleGroupUsers: string
}

@Injectable({
  providedIn: 'root'
})

export class UiService {
  tglGroupUsers: toggleGroupUsers = {
    initState: true,
    showUsers: true,
    titleGroupUsers: ''  
  }

  private subject = new Subject<any>();

  private isReadonly: boolean = true;

  constructor() { }

  toggleShowUser(title: string): void {
    this.tglGroupUsers.initState = false;
    this.tglGroupUsers.showUsers = !this.tglGroupUsers.showUsers;
    if(this.tglGroupUsers.showUsers) {
      this.tglGroupUsers.titleGroupUsers = '';
    } else {
      this.tglGroupUsers.titleGroupUsers = title;
    }
    this.subject.next(this.tglGroupUsers); 
  }

  handleReadonly(): void {
    this.isReadonly = !this.isReadonly;
    this.subject.next(this.isReadonly); 
  }

  onToggle(): Observable<any> {
    console.log('in ontoggle' , this.subject.asObservable())
    return this.subject.asObservable();
  }
}
