import { useRouter } from "next/router";
import React from "react";
import { ArrowLeft } from "react-feather";

const BackButtonComponent = () => {
  const router = useRouter();

  const handleButtonPress = () => {
    router.back();
  };
  return (
    <div
      className="bg-opacity-60 bg-blur p-3 bg-dark rounded-xl backdrop-blur "
      onClick={handleButtonPress}
    >
      <div className="filter-none text-white">
        <ArrowLeft />
      </div>
    </div>
  );
};

export default BackButtonComponent;
