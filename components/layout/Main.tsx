import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import AuthCheck from "@Components/common/AuthCheck";
import Navbar from "../common/Navbar";

const Main = ({ children }: any) => {
  const router = useRouter();
  return (
    <div className="">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Recipe Log</title>
      </Head>
      <AuthCheck />

      <Navbar path={router.asPath} />

      <div className="container mx-auto px-4 pt-8 max-h-screen flex flex-col ">
        {children}
      </div>
    </div>
  );
};

export default Main;
