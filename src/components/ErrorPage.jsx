import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from './UI';
import { HiExclamationTriangle, HiHome, HiArrowLeft } from 'react-icons/hi2';

const ErrorPage = ({ error = "Something went wrong" }) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Container className="max-w-md text-center">
        <div className="space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-full">
              <HiExclamationTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Oops!
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {error || "Something unexpected happened"}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Please try refreshing the page or go back to the dashboard. If the problem persists, contact support.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-none"
            >
              <HiHome className="w-5 h-5" />
              Go Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-none"
            >
              <HiArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ErrorPage;
