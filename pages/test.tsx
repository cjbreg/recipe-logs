import axios from "axios";
import React from "react";

const test = () => {
  const testFunction = async () => {
    try {
      const newUser = {
        username: "coen",
        email: "test@test.com",
        password: "pasword123",
      };

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
  return (
    <div>
      test
      <button onClick={testFunction}>press</button>
    </div>
  );
};

export default test;
