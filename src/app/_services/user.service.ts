import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    apiUrl: 'http://localhost:4000';
    private baseUrl = "http://192.168.100.166:8080/api"

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiUrl+`/users`);
    }

    getById(id: number) {
        return this.http.get(this.apiUrl+`/users/${id}`);
    }

    register(user: User) {
        return this.http.post(this.apiUrl+`/users/register`, user);
    }

    update(user: User) {
        return this.http.put(this.apiUrl+`/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl+`/users/${id}`);
    }

    registerLedger(user : User) {

        return this.http.post(environment.apiUrl + "/registeruser", user).subscribe(
    
          data => console.log('succes', data),
    
          error => console.log('eroro', error)
    
        );
}
}
