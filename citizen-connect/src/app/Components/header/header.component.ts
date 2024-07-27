import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import { loginSuccess, logout } from '../../store/auth/auth.actions';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {
    this.isLoggedIn$ = this.store.select(state => state.auth.isLoggedIn);
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnInit(): void {
    // Check local storage (user data and updating the state)
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('auth-user');
    if (token && user) {
      console.log(token);
      console.log(user);
      
      this.store.dispatch(loginSuccess({ token, user: JSON.parse(user) }));
    }

    // Subscribe to user observable na logging user role
    this.user$.subscribe(user => {
      if (user) {
        console.log('User role:', user.role);
      } else {
        console.log('No user logged in.');
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    this.router.navigate(['/login']);
  }
}
