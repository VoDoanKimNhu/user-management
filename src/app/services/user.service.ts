import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../User';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  onCreateUser(user: User): Observable<User> {
    console.log('test user service');
    console.log(user);
    return this.http.post<User>(this.apiUrl, user, HttpOptions);
  }

  onEditUser(user: User): Observable<User> {
    console.log('test user service')
    console.log(user.id);
    const url=`${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user, HttpOptions);  
  }

  onDeleteUser(user: User): Observable<User> {
    const url=`${this.apiUrl}/${user.id}`;
    return this.http.delete<User>(url);
  }
}
