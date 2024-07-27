import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginReq, LoginResponse, RegisterReq, RegisterResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000/auth/';
  private tokenKey = 'auth-token';
  private userKey = 'auth-user';

  constructor(private http: HttpClient) {}

  login(data: LoginReq): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}login`, data).pipe(
      map(response => {
        this.setToken(response.token);
        console.log('Response:', response);
        this.setUser(response.user);
        return response;
      }),
      catchError(error => throwError(() => new Error(error.error.message || 'Invalid credentials')))
    );
  }

  register(data: RegisterReq): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.BASE_URL}register`, data).pipe(
      map(response => {
        this.setToken(response.token);
        console.log(response);
        this.setUser(response.user);
        return response;
      }),
      catchError(error => throwError(() => new Error(error.error.message || 'Registration failed')))
    );
  }

  setToken(token: string): void {
    console.log('Setting token:', token);  
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('Retrieved token:', token);  
    return token;
  }

  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
