import produce from 'immer';
import { AuthStates } from '../../models/AuthStates';
import {
  AUTH_ERROR,
  AUTH_ERROR_DISMISS,
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_START_FLOW
} from '../types';

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
  message?: string;
};

export const initialState: AuthState = {
  loading: false,
  error: {
    enabled: false
  },
  authState: AuthStates.SIGNED_OUT,
  accessToken: null,
  id: null,
  email: null
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_START_FLOW: {
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.error = {
          enabled: false
        };
      });
    }
    case AUTH_SIGNIN:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.accessToken = action.payload.accessToken;
        draftState.authState = AuthStates.SIGNED_IN;
        draftState.id = action.payload.user.id;
        draftState.email = action.payload.user.email;
        draftState.error = {
          enabled: false
        };
      });

    case AUTH_ERROR:
      return produce(state, (draftState) => {
        console.log(action.payload);

        draftState.error = {
          ...action.payload.data
        };
        draftState.error.enabled = true;
        draftState.loading = false;
      });

    case AUTH_ERROR_DISMISS:
      return produce(state, (draftState) => {
        draftState.error = {
          enabled: false
        };
        draftState.loading = false;
      });

    case AUTH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
