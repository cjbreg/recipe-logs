import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { AuthStates } from '../../src/models/AuthStates';
import { State } from '../../src/store/reducers';

const AuthCheck = () => {
  const router = useRouter();

  const { authState } = useSelector((state: State) => state.authData);

  if (authState === AuthStates.SIGNED_OUT) {
    router.push('/welcome');
    return <></>;
  }

  return <></>;
};

export default AuthCheck;
