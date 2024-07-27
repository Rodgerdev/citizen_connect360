import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { View } from '../models/view.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private BASE_URL = 'http://localhost:3000/';
  private FLASK_URL = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  getViews(): Observable<View[]> {
    return this.http.get<View[]>(`${this.BASE_URL}views`).pipe(
      switchMap(views => {
        const userRequests = views.map(view => this.http.get<{ name: string }>(`${this.BASE_URL}auth/users/${view.userId}`));
        return forkJoin(userRequests).pipe(
          map(users => {
            return views.map((view, index) => ({
              ...view,
              userName: users[index].name
            }));
          })
        );
      })
    );
  }

  addView(view: View): Observable<View> {
    return this.http.post<View>(`${this.BASE_URL}views`, view);
  }

  getSummary(userId: string): Observable<string> {
    const query = "Give me all the views in summary of what they talk about";
    return this.http.post<string>(`${this.FLASK_URL}educate-chat`, { userId, query });
  }
}
