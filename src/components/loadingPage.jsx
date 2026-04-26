import React from 'react';
import { Container } from './UI';

const LoadingPage = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Animated spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Loading...
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default LoadingPage;
