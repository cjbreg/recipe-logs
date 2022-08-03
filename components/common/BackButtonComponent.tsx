import { useRouter } from "next/router";
import React from "react";
import { ArrowLeft } from "react-feather";

type Props = {
  onPress?: () => void;
};

const BackButtonComponent = (props: Props) => {
  const router = useRouter();

  const handleButtonPress = () => {
    if (props.onPress) props.onPress();
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
