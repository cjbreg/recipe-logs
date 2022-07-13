import React from "react";
import Main from "../components/layout/Main";
import Image from "next/image";

const Profile = () => {
  return (
    <Main>
      <div className="flex flex-col justify-center items-center h-screen">
        <Image src="/images/undraw_building.svg" height={400} width={400} />
        <p>Work in progress</p>
      </div>
    </Main>
  );
};

export default Profile;
