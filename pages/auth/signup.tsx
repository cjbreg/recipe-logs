import Head from "next/head";
import React from "react";
import BackButtonComponent from "../../components/common/BackButtonComponent";

const signup = () => {
  return (
    <div className="flex flex-col bg-primary min-h-screen	">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sign Up - Recipe Log</title>
      </Head>
      <div className="absolute left-0 top-0 m-4 pt-8">
        <BackButtonComponent />
      </div>
    </div>
  );
};

export default signup;
