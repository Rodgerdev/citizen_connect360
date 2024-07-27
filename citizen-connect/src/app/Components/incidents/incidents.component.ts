import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../services/incident.service';
import { Observable } from 'rxjs';
import { Incident } from '../../models/incident.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IncidentsComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  summary: string = '';
  userRole: string | null = null;
  user: User | null = null;
  showAddIncidentPopup: boolean = false;
  newIncident: Partial<Incident> = { description: '', multimedia: [] };

  constructor(private incidentService: IncidentService, private store: Store<{ auth: AuthState }>) {
    this.incidents$ = this.incidentService.getIncidents();
  }

  ngOnInit(): void {
    this.store.select(state => state.auth.user).subscribe((user: User | null) => {
      if (user) {
        this.userRole = user.role;
        this.user = user;
      }
    });
  }

  summarizeIncidents() {
    this.incidents$.subscribe(incidents => {
      const texts = incidents.map(incident => incident.description).join(' ');
      // Simulate AI summary
      this.summary = `Summary of incidents: ${texts}`;
    });
  }

  openAddIncidentPopup() {
    this.showAddIncidentPopup = true;
  }

  closeAddIncidentPopup() {
    this.showAddIncidentPopup = false;
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.newIncident.multimedia = [];
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newIncident.multimedia!.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  submitIncident() {
    if (this.user) {
      // Logic to submit the new incident with the current user's information
      const incident: Incident = {
        id: Date.now().toString(),
        title: '',
        description: this.newIncident.description || '',
        multimedia: this.newIncident.multimedia || [],
        reportedBy: `${this.user.username} @${this.user.username}`
      };
      this.incidentService.reportIncident(incident).subscribe(() => {
        this.closeAddIncidentPopup();
        this.incidents$ = this.incidentService.getIncidents();
      });
    }
  }
}
