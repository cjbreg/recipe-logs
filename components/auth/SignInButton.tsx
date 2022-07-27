import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { signIn } from "../../store/actions/authAction";
import { useAppDispatch } from "../../store/store";

interface Props {
  isValid: boolean;
  email: string;
  password: string;
}

const SignInButton = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isValid, email, password } = props;

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const authData = await axios
        .post("/api/auth/signin", { email, password })
        .then((res) => res.data);
      console.log(authData);
      dispatch(signIn(authData));
      router.push("/profile");
    } catch (error) {}
  };

  return (
    <button
      disabled={!isValid}
      onClick={handleLogin}
      type="submit"
      className="disabled:bg-gray-300 px-8 py-2 font-medium bg-secondary text-white uppercase rounded hover:bg-green-500 transition duration-150"
    >
      Login
    </button>
  );
};

export default SignInButton;
