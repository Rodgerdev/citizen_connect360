import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private BASE_URL = 'http://localhost:3000/polls/';

  constructor(private http: HttpClient) {}

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.BASE_URL);
  }

  createPoll(data: Poll): Observable<Poll> {
    return this.http.post<Poll>(this.BASE_URL, data);
  }
}
