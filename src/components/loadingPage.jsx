import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <ImSpinner2 className="animate-spin text-6xl mb-4 text-blue-500" />
      <div className="text-2xl">Loading...</div>
    </div>
  );
};

export default LoadingPage;
