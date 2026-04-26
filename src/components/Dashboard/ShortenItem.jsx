import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Card, Button, Badge } from '../UI';
import { HiCheck, HiDocumentDuplicate, HiChartBar, HiExternalLink } from 'react-icons/hi';
import Graph from './Graph';
import toast from 'react-hot-toast';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdAt, refetch }) => {
  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(/^https?:\/\//, "");
  const { token } = useStoreContext();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticsToggle, setAnalyticsToggle] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [analyticData, setAnalyticData] = useState([]);
  const navigate = useNavigate();

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const analyticsHandler = (shortUrl) => {
    if (!analyticsToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticsToggle(!analyticsToggle);
  };

  const fetchAnalytics = async () => {
    setLoader(true);
    try {
      const endDate = dayjs().format("YYYY-MM-DDTHH:mm:ss");
      const startDate = dayjs().subtract(7, "day").format("YYYY-MM-DDTHH:mm:ss");
      const url = `/api/url/analytics/${selectedUrl}?startDate=${startDate}&endDate=${endDate}`;

      const { data } = await api.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setAnalyticData(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load analytics");
      navigate("/error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) fetchAnalytics();
  }, [selectedUrl]);

  // Truncate URL for display
  const truncateUrl = (url, maxLength = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
  };

  const shortUrlFull = `${subDomain}/${shortUrl}`;

  return (
    <>
      <Card className="hover:shadow-lg transition-all">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 min-w-0">
            {/* Short URL */}
            <div className="mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold uppercase">
                Short URL
              </p>
              <a
                href={`http://${shortUrlFull}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-mono text-sm break-all"
              >
                {shortUrlFull}
                <HiExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>

            {/* Original URL */}
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold uppercase">
                Original URL
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 break-all">
                {truncateUrl(originalUrl)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 md:ml-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold">
                CLICKS
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {clickCount || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="gray">
              {dayjs(createdAt).format("MMM DD, YYYY")}
            </Badge>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* Copy Button */}
            <CopyToClipboard
              onCopy={handleCopy}
              text={shortUrlFull}
            >
              <Button
                variant={isCopied ? "secondary" : "primary"}
                size="md"
                className="flex-1 sm:flex-none"
              >
                {isCopied ? (
                  <>
                    <HiCheck className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <HiDocumentDuplicate className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </CopyToClipboard>

            {/* Analytics Button */}
            <Button
              variant={analyticsToggle ? "secondary" : "outline"}
              size="md"
              onClick={() => analyticsHandler(shortUrl)}
              className="flex-1 sm:flex-none"
            >
              <HiChartBar className="w-4 h-4" />
              {analyticsToggle ? "Hide" : "Analytics"}
            </Button>
          </div>
        </div>

        {/* Analytics Section */}
        {analyticsToggle && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Last 7 Days Analytics
            </h4>
            
            {loader ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Loading analytics...
                  </p>
                </div>
              </div>
            ) : analyticData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No data available for this period
                </p>
              </div>
            ) : (
              <div className="h-64 md:h-72">
                <Graph graphData={analyticData} />
              </div>
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default ShortenItem;