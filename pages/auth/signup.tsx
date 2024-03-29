import Head from 'next/head';
import React, { useState } from 'react';
import SignUpButton from '@Components/auth/SignUpButton';
import BackButtonComponent from '@Components/common/BackButtonComponent';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { State } from '../../src/store/reducers';
import { useAppDispatch } from '../../src/store/store';
import { AUTH_ERROR_DISMISS } from '../../src/store/types';
import { NextPage } from 'next/types';

const SignUp: NextPage = () => {
  const dispatch = useAppDispatch();

  const { error } = useSelector((state: State) => state.authData);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);
  const handleVerifyPasswordChange = (event: any) => setVerifyPassword(event.target.value);

  const onBackPress = () => {
    dispatch({ type: AUTH_ERROR_DISMISS });
  };

  const isValid = () => {
    const regex = /^\S+@\S+$/;
    return email.length > 0 && password.length > 8 && regex.test(email);
  };

  const renderError = () => {
    if (!error.enabled) return;

    return (
      <div>
        <span className="text-red-500 text-xs">
          {error.message ?? 'Something went wrong, pleasy try again'}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-primary min-h-screen	">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sign In - Recipe Log</title>
      </Head>
      <div className="absolute left-0 top-0 m-4 pt-8">
        <BackButtonComponent onPress={onBackPress} />
      </div>

      <div className="container flex flex-col mx-auto justify-center items-center px-4 py-4 min-h-screen  w-full">
        <div className="-mt-40 text-center mb-8">
          <Image src="/images/undraw_signup.svg" height={300} width={300} alt="signup image" />
          <h1 className=" font-semibold text-2xl text-secondary ">Create Account</h1>
        </div>
        <form className="px-16 w-full">
          <div className="pb-4 w-full">
            <input
              type="email"
              className="bg-primary rounded-lg w-full p-2.5 px-4 focus:border-secondary focus:outline-none border "
              required
              onChange={handleEmailChange}
              value={email}
              name="email"
              placeholder="email"
            />
          </div>
          <div className="pb-4 w-full">
            <input
              type="password"
              className="bg-primary rounded-lg w-full p-2.5 px-4 focus:border-secondary focus:outline-none border"
              required
              onChange={handlePasswordChange}
              value={password}
              name="password"
              placeholder="password"
            />
          </div>
          <div className="pb-4 w-full">
            <input
              type="password"
              className="bg-primary rounded-lg w-full p-2.5 px-4 focus:border-secondary focus:outline-none border"
              required
              onChange={handleVerifyPasswordChange}
              value={verifyPassword}
              name="verifyPassword"
              placeholder="verify password"
            />
          </div>
          <div className="w-full mx-auto flex justify-center">
            <SignUpButton
              email={email}
              password={password}
              verifyPassword={verifyPassword}
              isValid={isValid()}
            />
          </div>
        </form>
        {renderError()}
      </div>
    </div>
  );
};

export default SignUp;
