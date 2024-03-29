import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  apiUrl: 'http://localhost:4000';

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    //console.log(this.currentUserSubject.value.role)
      return this.currentUserSubject.value;
  }

  public get currentUserRole(): string { 
      console.log(this.currentUserSubject.value.role)
    return this.currentUserSubject.value.role;
  }

  public get currentUserUsername(): string { 
    console.log(this.currentUserSubject.value.username)
  return this.currentUserSubject.value.username;
}

  login(username: string, password: string) {
      return this.http.post<any>(this.apiUrl+`/users/authenticate`, { username, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
