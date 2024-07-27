import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import { loginSuccess, logout, registerSuccess } from './auth.actions';

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    user,
    isLoggedIn: true
  })),
  on(registerSuccess, (state, { token, user }) => ({
    ...state,
    user,
    isLoggedIn: true
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    isLoggedIn: false
  }))
);
