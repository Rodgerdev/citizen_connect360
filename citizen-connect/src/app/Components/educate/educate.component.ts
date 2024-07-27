import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-educate',
  templateUrl: './educate.component.html',
  styleUrls: ['./educate.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class EducateComponent {
  documents$ = this.documentService.getDocuments();

  constructor(private documentService: DocumentService, private router: Router) {}

  goToChat(title: string): void {
    this.router.navigate(['ai-chat'], { queryParams: { title } });
    console.log("this is the paGE")
  }
}
