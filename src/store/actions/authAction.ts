import { User } from '@Models/User';
import { AUTH_ERROR, AUTH_SIGNIN, AUTH_SIGNOUT, AUTH_START_FLOW } from '../types';

interface ISignInResponse {
  accessToken: string;
  user: User;
}

export const signIn = ({ accessToken, user }: ISignInResponse) => ({
  type: AUTH_SIGNIN,
  payload: { accessToken, user }
});

export const signOut = () => ({
  type: AUTH_SIGNOUT
});

export const startAuth = () => ({
  type: AUTH_START_FLOW
});

export const authError = (payload: any) => ({
  type: AUTH_ERROR,
  payload
});
