import { User } from '@models/user/user.model';

export interface AuthResponse {
  access_token: string;
  user?: User;
}
