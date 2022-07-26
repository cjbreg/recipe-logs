import axios from "axios";
import React from "react";
import { signIn } from "../store/actions/authAction";
import { useAppDispatch } from "../store/store";

const test = () => {
  const dispatch = useAppDispatch();

  const testFunction = async () => {
    const res = await axios
      .get<string>("/api/user")
      .then((data) => {
        console.log(data.data.name);

        return data.data.name;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
      });

    dispatch(signIn(res, "Password123"));
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
