import produce from "immer";
import { AuthStates } from "../../models/AuthStates";
import { AUTH_SIGNIN, AUTH_SIGNOUT } from "../types";

export interface AuthState {
  loading: boolean;
  error: Error;
  authState: AuthStates;
  accessToken: string | null;
  id: number | null;
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
  accessToken: null,
  id: null,
  email: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      console.log(action.payload);

      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.accessToken = action.payload.accessToken;
        draftState.authState = AuthStates.SIGNED_IN;
        draftState.id = action.payload.user.id;
        draftState.email = action.payload.user.email;
      });

    case AUTH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
