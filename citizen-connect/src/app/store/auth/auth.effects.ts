import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(action =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map(response => {
            // Ensure user is properly returned from the service
            console.log('User logged in:', response.user);
            return loginSuccess({ token: response.token, user: response.user });
          }),
          catchError(error => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
}
