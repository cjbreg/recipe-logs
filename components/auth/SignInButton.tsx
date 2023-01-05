import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { cookieOptions } from 'src/web/token';
import { authError, signIn, startAuth } from 'src/store/actions/authAction';
import { State } from 'src/store/reducers';
import { useAppDispatch } from 'src/store/store';

interface Props {
  isValid: boolean;
  email: string;
  password: string;
}

const SignInButton = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [cookie, setCookie] = useCookies(['auth']);

  const { loading } = useSelector((state: State) => state.authData);

  const { isValid, email, password } = props;

  const handleLogin = async (event: any) => {
    event.preventDefault();
    dispatch(startAuth());

    try {
      const authData = await axios
        .post('/api/auth/signin', { email, password })
        .then((res) => res.data);
      setCookie('auth', JSON.stringify({ token: authData.accessToken }), cookieOptions);
      dispatch(signIn(authData));
      router.push('/');
    } catch (error: any) {
      dispatch(authError(error.response));
    }
  };

  return (
    <button
      disabled={!isValid}
      onClick={handleLogin}
      type="submit"
      className="disabled:bg-gray-300 px-8 py-2 font-medium bg-secondary text-white uppercase rounded hover:bg-green-500 transition duration-150">
      {loading ? <span className="animate-pulse">Loading...</span> : 'Sign In'}
    </button>
  );
};

export default SignInButton;
