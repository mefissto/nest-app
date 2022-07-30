import { User } from '@models/user/user.model';

export interface AuthState {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  token: null,
};
