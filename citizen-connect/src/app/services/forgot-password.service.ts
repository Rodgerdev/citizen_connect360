import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private BASE_URL = 'http://localhost:3000/forgot-password';

  constructor(private http: HttpClient) { }

  sendResetLink(email: string): Observable<any> {
    return this.http.post(this.BASE_URL, { email });
  }
}
