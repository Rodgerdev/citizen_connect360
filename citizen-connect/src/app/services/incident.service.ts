import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private BASE_URL = 'http://localhost:3000/incidents/';

  constructor(private http: HttpClient) {}

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.BASE_URL);
  }

  reportIncident(data: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.BASE_URL, data);
  }
}
