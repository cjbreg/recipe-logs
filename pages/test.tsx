import axios from "axios";
import React from "react";
import { signIn } from "../store/actions/authAction";
import { useAppDispatch } from "../store/store";

const test = () => {
  const dispatch = useAppDispatch();

  const fetchTestData = async () => {
    try {
      const testData = await axios.get("/api/hello").then((res) => res.data);
      dispatch(signIn(testData, "cunt"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      test
      <br />
      <button onClick={fetchTestData}>press</button>
      <br />
    </div>
  );
};

export default test;
