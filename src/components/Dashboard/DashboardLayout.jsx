import React, { useState } from 'react';
import Graph from './Graph';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import ShortenPopUp from './ShortenPopUp';
import ShortenUrlList from './ShortenUrlList';
import LoadingPage from '../loadingPage';
import { Card, Button, Container, Section, EmptyState } from '../UI';
import { HiLink, HiEye, HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  function onError() {
    console.log('ERROR');
    navigate("/error");
  }

  const {
    isLoading: loaderTotalClicks,
    data: totalClicks,
  } = useFetchTotalClicks(token, onError);

  const { isLoading: loaderUrls, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError);

  // Calculate stats
  const totalClicksCount = totalClicks?.reduce((sum, item) => sum + (item.count || 0), 0) || 0;
  const totalLinksCount = myShortenUrls?.length || 0;

  const isLoading = loaderTotalClicks || loaderUrls;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track, manage, and analyze your shortened URLs
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Links Card */}
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                    Total Links Created
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {totalLinksCount}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <HiLink className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                All time
              </p>
            </Card>

            {/* Total Clicks Card */}
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                    Total Clicks
                  </p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {totalClicksCount}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <HiEye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last 7 days
              </p>
            </Card>

            {/* Create New Button */}
            <Card className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/50 hover:shadow-none cursor-auto" onClick={() => {}}>
              <Button 
                variant="primary" 
                size="lg"
                className="w-full"
                onClick={() => setShortenPopUp(true)}
              >
                <HiPlus className="w-5 h-5" />
                Create New Link
              </Button>
            </Card>
          </div>

          {/* Graph Section */}
          {totalClicks.length > 0 && (
            <Card className="mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Analytics
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Clicks over the last 7 days
                </p>
              </div>
              <div className="h-96">
                <Graph graphData={totalClicks} />
              </div>
            </Card>
          )}

          {/* URL List Section */}
          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Your Links
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage and monitor all your shortened URLs
              </p>
            </div>

            {myShortenUrls.length === 0 ? (
              <Card>
                <EmptyState
                  icon={HiLink}
                  title="No links yet"
                  description="Start creating your first shortened URL to see it here"
                  action={
                    <Button variant="primary" onClick={() => setShortenPopUp(true)}>
                      <HiPlus className="w-5 h-5" />
                      Create Your First Link
                    </Button>
                  }
                />
              </Card>
            ) : (
              <ShortenUrlList data={myShortenUrls} refetch={refetch} />
            )}
          </div>
        </Container>
      )}

      {/* Modal */}
      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </main>
  );
};

export default DashboardLayout;
