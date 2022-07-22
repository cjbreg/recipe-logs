import axios from "axios";
import React from "react";

const test = () => {
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

  return (
    <div className="flex flex-col">
      test
      <br />
      <button onClick={testFunction}>press</button>
      <br />
    </div>
  );
};

export default test;
