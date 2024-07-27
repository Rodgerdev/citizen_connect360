import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TokenInterceptor } from './interceptors/token.interceptor'; // Adjust the path if necessary
import { appReducers } from './store/app.state';
import { AuthEffects } from './store/auth/auth.effects';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideRouter(routes),
    provideStore(appReducers),
    provideEffects([AuthEffects]),
    importProvidersFrom(StoreModule.forRoot(appReducers))
  ]
};
