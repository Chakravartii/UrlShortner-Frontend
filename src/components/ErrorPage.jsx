import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im'; 

const ErrorPage = ({ error}) => {
  return (
    // <ImSpinner2 className="animate-spin text-6xl text-blue-500 mb-4" />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
          <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
      {error ? (
            <h1 className="text-4xl font-bold text-red-600 mb-4">
            {error}
          </h1>
      ) : (
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Something Unexpected Happened
          </h1>
        
      )}
      <p className="text-gray-700 text-center max-w-md">
            Please try refreshing the page or come back later. If the problem persists, contact support.
          </p>
    </div>
  );
};

export default ErrorPage;
