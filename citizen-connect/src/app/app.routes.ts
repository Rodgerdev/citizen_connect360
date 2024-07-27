import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', loadComponent: () => import('./Components/landing-page/landing-page.component').then(m => m.LandingPageComponent) },
  { path: 'home', loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'educate', loadComponent: () => import('./Components/educate/educate.component').then(m => m.EducateComponent), canActivate: [AuthGuard] },
  { path: 'views', loadComponent: () => import('./Components/views/views.component').then(m => m.ViewsComponent), canActivate: [AuthGuard] },
  { path: 'incidents', loadComponent: () => import('./Components/incidents/incidents.component').then(m => m.IncidentsComponent), canActivate: [AuthGuard] },
  { path: 'polls', loadComponent: () => import('./Components/polls/polls.component').then(m => m.PollsComponent), canActivate: [AuthGuard] },
  { path: 'dashboard', loadComponent: () => import('./Components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { path: 'pending-approvals', loadComponent: () => import('./Components/pending-approvals/pending-approvals.component').then(m => m.PendingApprovalsComponent), canActivate: [AuthGuard] },
  { path: 'all-users', loadComponent: () => import('./Components/all-users/all-users.component').then(m => m.AllUsersComponent), canActivate: [AuthGuard] },
  { path: 'ai-chat', loadComponent: () => import('./Components/ai-chat/ai-chat.component').then(m => m.AiChatComponent), canActivate: [AuthGuard] },
  { path: 'forgot-password', loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), canActivate: [AuthGuard] },
  { path: 'reset-password', loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'landing-page' }
];
