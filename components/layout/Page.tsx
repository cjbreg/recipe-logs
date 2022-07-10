import Head from "next/head";
import React from "react";

const Page = ({ children }: any) => {
  return (
    <div className="">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Recipe Log</title>
      </Head>
      <div className="container mx-auto px-4 py-8 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Page;
