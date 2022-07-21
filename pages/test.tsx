import axios from "axios";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const test = () => {
  const { data: session, status } = useSession();

  const testFunction = async () => {
    try {
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: "Bearer " + "asdf", //the token is a variable which holds the token
        },
      });

      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const renderSessionState = () => {
    console.log(session, status);
    if (session) return "true";
    return "false";
  };

  return (
    <div className="flex flex-col">
      test
      <br />
      <button onClick={testFunction}>press</button>
      <br />
      <button onClick={() => signIn()}>Sign in</button>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
      <br />
      <p>{renderSessionState()}</p>
    </div>
  );
};

export default test;
