import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import {
  authError,
  signIn,
  startAuth,
} from "../../src/store/actions/authAction";
import { State } from "../../src/store/reducers";
import { useAppDispatch } from "../../src/store/store";

interface Props {
  isValid: boolean;
  email: string;
  password: string;
  verifyPassword: string;
}

const SignUpButton = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useSelector((state: State) => state.authData);

  const { isValid, email, password, verifyPassword } = props;

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    dispatch(startAuth());
    try {
      if (password !== verifyPassword) {
        throw {
          response: {
            data: { message: "Passwords do not match" },
            status: 409,
          },
        };
      }
      const authData = await axios
        .post("/api/auth/signup", { email, password })
        .then((res) => res.data);
      dispatch(signIn(authData));
      router.push("/profile");
    } catch (error: AxiosError | any) {
      dispatch(authError(error.response));
    }
  };

  return (
    <button
      disabled={!isValid || loading}
      onClick={handleSignUp}
      type="submit"
      className="disabled:bg-gray-300 px-8 py-2 font-medium bg-secondary text-white uppercase rounded hover:bg-green-500 transition duration-150"
    >
      {loading ? <span className="animate-pulse">Loading...</span> : "Sign Up"}
    </button>
  );
};

export default SignUpButton;
