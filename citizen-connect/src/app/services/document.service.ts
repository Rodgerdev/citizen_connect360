import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private BASE_URL = 'http://localhost:3000/documents/';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    //return this.http.get<Document[]>(this.BASE_URL);
    return of([
      {id:'1', url:'', title: 'Finance Bill', description: 'Learn about the finance bill proposed in the National Assembly' },
      { id:'2', url:'', title: 'Land Bill', description: 'Learn about the Lands bill proposed in the National Assembly' },
      { id:'3', url:'', title: 'Clean Code', description: 'Learn ' }
    ]);
  }
}
