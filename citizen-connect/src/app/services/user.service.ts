import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    localStorage.getItem('auth-token')
    return this.http.get<User[]>(this.BASE_URL);
  }
}
