import { AuthStates } from "../../models/AuthStates";
import { AUTH_SIGNIN } from "../types";

export interface AuthState {
  loading: boolean;
  error: Error;
  authState: AuthStates;
  token: string | null;
  userId: number | null;
  email: string | null;
}

type Error = {
  enabled: boolean;
};

export const initialState: AuthState = {
  loading: false,
  error: {
    enabled: false,
  },
  authState: AuthStates.SIGNED_OUT,
  token: null,
  userId: null,
  email: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      console.log(action.payload);

      return state;

    default:
      return state;
  }
};

export default authReducer;
