import Head from "next/head";
import React, { useEffect, useState } from "react";
import BackButtonComponent from "../../components/common/BackButtonComponent";
import Image from "next/image";
import axios from "axios";
import { useAppDispatch } from "../../store/store";
import { signIn } from "../../store/actions/authAction";
import { useRouter } from "next/router";

const signin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const isValid = () => {
    const regex = /^\S+@\S+$/;
    return email.length > 0 && password.length > 8 && regex.test(email);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (error) return;
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
    <div className="flex flex-col bg-primary min-h-screen	">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sign In - Recipe Log</title>
      </Head>
      <div className="absolute left-0 top-0 m-4 pt-8">
        <BackButtonComponent />
      </div>

      <div className="container flex flex-col mx-auto justify-center items-center px-4 py-4 min-h-screen  w-full">
        <div className="-mt-64 text-center mb-8">
          <Image src="/images/undraw_login.svg" height={300} width={300} />
          <h1 className="-mt-12 font-semibold text-2xl text-secondary ">
            Sign In
          </h1>
        </div>
        <form className="px-16 w-full">
          <div className="pb-4 w-full">
            <input
              type="email"
              className="bg-primary rounded-lg w-full p-2.5 px-4 focus:border-secondary focus:outline-none border "
              required
              onChange={handleEmailChange}
              value={email}
              name="email"
              placeholder="email"
            />
          </div>
          <div className="pb-4 w-full">
            <input
              type="password"
              className="bg-primary rounded-lg w-full p-2.5 px-4 focus:border-secondary focus:outline-none border"
              required
              onChange={handlePasswordChange}
              value={password}
              name="password"
              placeholder="password"
            />
          </div>
          <div className="w-full mx-auto flex justify-center">
            <button
              disabled={!isValid()}
              onClick={handleLogin}
              type="submit"
              className="disabled:bg-gray-300 px-8 py-2 font-medium bg-secondary text-white uppercase rounded hover:bg-green-500 transition duration-150"
            >
              Login
            </button>
          </div>
          <div className="mx-auto flex justify-center mt-2">
            <p className="text-red-500 text-xs">{errorMessage}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signin;
