import { User } from '@models/user/user.model';

export interface AuthState {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
}
