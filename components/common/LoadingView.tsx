import React from 'react';
import { Loader } from 'react-feather';

const LoadingView = () => {
  return (
    <div className="h-full flex  justify-center items-center text-dark">
      <div className="animate-spin m-4">
        <Loader size={40} strokeWidth={2} />
      </div>
    </div>
  );
};

export default LoadingView;
