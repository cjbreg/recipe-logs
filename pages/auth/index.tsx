import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import React from 'react';

const Index: NextPage = () => {
  const router = useRouter();

  const navigateSignup = () => {
    router.push('/auth/signup');
  };
  const navigateSignin = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="container mx-auto px-4 pt-8 flex flex-col h-screen">
      <div className="flex flex-col  ">
        <div className="flex flex-col pb-8">
          <h1 className="text-dark text-3xl font-bold">Welcome</h1>
          <h2 className="text-dark text-2xl font-medium">
            Please login or create an account to use the application
          </h2>
        </div>
        <div className="flex flex-col justify-center text-center mx-auto items-center pt-40 ">
          <button
            onClick={navigateSignin}
            type="submit"
            className="disabled:bg-gray-300 w-48 py-3 font-medium bg-secondary text-white uppercase rounded-xl hover:bg-green-500 transition duration-150">
            Login
          </button>
          <div className="flex relative py-2 items-center">
            <div className="border-t border-gray-200 flex-grow w-20" />
            <span className="py-4 mx-4"> or </span>
            <hr className="border-t border-gray-200 flex-grow w-20" />
          </div>
          <button
            onClick={navigateSignup}
            type="submit"
            className="disabled:bg-gray-300 w-48 py-3 font-medium bg-secondary text-white uppercase rounded-xl hover:bg-green-500 transition duration-150">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
