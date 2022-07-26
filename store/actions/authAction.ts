import { AUTH_SIGNIN } from "../types";

export const signIn = (email: string, password: string) => ({
  type: AUTH_SIGNIN,
  payload: { email, password },
});
