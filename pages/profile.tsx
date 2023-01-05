import React from 'react';
import Main from '@Components/layout/Main';
import { useSelector } from 'react-redux';
import { State } from 'src/store/reducers';
import { useAppDispatch } from 'src/store/store';
import { signOut } from 'src/store/actions/authAction';
import { LogOut } from 'react-feather';
import { AuthStates } from '@Models/AuthStates';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, NextPage } from 'next/types';
import { useCookies } from 'react-cookie';
import { verifyToken } from 'src/web/token';

const Profile: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [removeCookie] = useCookies();

  const { authState, email } = useSelector((state: State) => state.authData);

  const handleSignOut = () => {
    removeCookie('auth');
    dispatch(signOut());
  };

  const navigateSignup = () => {
    router.push('/auth/signup');
  };
  const navigateSignin = () => {
    router.push('/auth/signin');
  };

  const renderAuthorizedView = () => (
    <div className="flex flex-col  h-screen ">
      <div className="flex justify-between">
        <div className="flex flex-col pb-8">
          <h1 className="text-dark text-3xl font-bold">Logged in as:</h1>
          <h2 className="text-dark text-2xl font-medium">{email}</h2>
        </div>
        <div className="pt-4" onClick={handleSignOut}>
          <LogOut size={28} />
        </div>
      </div>
      <div></div>
    </div>
  );

  const renderUnauthorizedView = () => (
    <div className="flex flex-col  h-screen ">
      <div className="flex flex-col pb-8">
        <h1 className="text-dark text-3xl font-bold">Using app as:</h1>
        <h2 className="text-dark text-2xl font-medium">Guest</h2>
      </div>
      <div className="flex flex-col justify-center text-center mx-auto items-center h-4/6 ">
        <button
          onClick={navigateSignin}
          type="submit"
          className="disabled:bg-gray-300 w-48 py-3 font-medium bg-secondary text-white uppercase rounded-xl hover:bg-green-500 transition duration-150">
          Login
        </button>
        <div className="flex relative py-2 items-center">
          <div className="border-t border-gray-200 flex-grow w-20" />
          <span className="py-4 mx-4"> or </span>
          <hr className="border-t border-gray-200 flex-grow w-20" />
        </div>
        <button
          onClick={navigateSignup}
          type="submit"
          className="disabled:bg-gray-300 w-48 py-3 font-medium bg-secondary text-white uppercase rounded-xl hover:bg-green-500 transition duration-150">
          Sign up
        </button>
      </div>
    </div>
  );

  return (
    <Main>
      {authState === AuthStates.SIGNED_IN ? renderAuthorizedView() : renderUnauthorizedView()}
    </Main>
  );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await verifyToken(context.req);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth'
      },
      props: {}
    };
  }
  return {
    props: {}
  };
}
