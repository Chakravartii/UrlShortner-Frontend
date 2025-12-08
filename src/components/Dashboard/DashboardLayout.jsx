import React, { useState } from 'react';
import Graph from './Graph';
import { dummyData } from '../../dummy/data';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import ShortenPopUp from './ShortenPopUp';
import ShortenUrlList from './ShortenUrlList';

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  function onError() {
    console.log('ERROR');
  }

  const {
    isLoading: loader,
    data: totalClicks,
  } = useFetchTotalClicks(token, onError);

    const { isLoading,data: myShortenUrls,refetch, } = useFetchMyShortUrls(token, onError);

  return (
    <div>
      {loader ? (
        <p>Loading......</p>
      ) : (
        <div>
          <div className="relative w-full min-h-[300px]">
            {totalClicks.length === 0 && (
              <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className="text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}
            <Graph graphData={totalClicks} />
          </div>

          <div>
            <button onClick={() => setShortenPopUp(true)}>
              Create a new Short URL
            </button>
          </div>

          <div>
            { !isLoading && myShortenUrls.length === 0 ?(
              <div>You Haven't Created any div Yet</div>
            ):(
              <ShortenUrlList data ={myShortenUrls}/>
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
