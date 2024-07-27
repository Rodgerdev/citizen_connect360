import { User } from '../../models/user.model';

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false
};