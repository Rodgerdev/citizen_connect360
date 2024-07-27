import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUser } from '../../models/user.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AllUsersComponent {
  SystemUsers: SystemUser[] = [
    { id: '1', name: 'John Doe', email: 'johndoe10@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/28/20/23/ai-generated-7751688_1280.jpg' },
    { id: '2', name: 'Mary Jane', email: 'maryjane10@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2017/05/27/19/29/profile-2349288_1280.jpg' },
    { id: '3', name: 'Tom Brady', email: 'tombrady10@gmail.com', imageUrl: 'https://pixabay.com/illustrations/profile-profile-pic-human-face-2398782/'}
  ];
}
