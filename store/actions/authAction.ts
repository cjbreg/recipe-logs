import { User } from "../../models/User";
import { AUTH_SIGNIN, AUTH_SIGNOUT } from "../types";

interface ISignInResponse {
  accessToken: string;
  user: User;
}

export const signIn = ({ accessToken, user }: ISignInResponse) => ({
  type: AUTH_SIGNIN,
  payload: { accessToken, user },
});

export const signOut = () => ({
  type: AUTH_SIGNOUT,
});
