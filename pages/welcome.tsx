import { useRouter } from "next/router";
import React from "react";
import Main from "../components/layout/Main";
import Page from "../components/layout/Page";

const welcome = () => {
  const router = useRouter();

  const navigateSignup = () => {
    router.push("/auth/signup");
  };
  const navigateSignin = () => {
    router.push("/auth/signin");
  };

  return (
    <Page>
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
            className="disabled:bg-gray-300 w-48 py-3 font-medium bg-secondary text-white uppercase rounded-xl hover:bg-green-500 transition duration-150"
          >
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
            className="disabled:bg-gray-300 w-48 py-3 font-medium bg-secondary text-white uppercase rounded-xl hover:bg-green-500 transition duration-150"
          >
            Sign up
          </button>
        </div>
      </div>
    </Page>
  );
};

export default welcome;
