import dayjs from 'dayjs';
import React, { useEffect, useState,Fragment} from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import {LiaCheckSolid} from 'react-icons/lia'
import { IoCopy } from 'react-icons/io5';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Link, useNavigate } from 'react-router-dom';
import { nav } from 'motion/react-client';
import api from '../../api/api';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';


const ShortenItem = ({originalUrl,shortUrl,clickCount,createdAt}) => {
    const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
        /^https?:\/\//,"");

const {token} = useStoreContext();
const [isCopied,setIsCopied] =useState(false);
const [analyticsTogle,setAnalyticsToggle] = useState(false);
const [selectedUrl,setSelectedUrl] = useState("");
const [loader,setLoader] = useState(false);
const [analyticData,setAnalyticData] = useState([]);
const navigate = useNavigate();

const analyticsHandler = (shortUrl)=>{
    if(!analyticsTogle){
        setSelectedUrl(shortUrl);
    }
    setAnalyticsToggle(!analyticsTogle);
}

const useFetchMyShortUrl = async ()=>{
    try{
        const endDate = dayjs().format("YYYY-MM-DDTHH:mm:ss");
        const startDate = dayjs().subtract(7, "day").format("YYYY-MM-DDTHH:mm:ss");

        const url = `/api/url/analytics/${selectedUrl}?startDate=${startDate}&endDate=${endDate}`;

        const {data} = await api.get(url,{
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:"Bearer "+token,
            },
        });
        setAnalyticData(data);
        console.log(data);
        setSelectedUrl("");
    }
    catch(error){
        navigate("/dashboard");
        console.log(error);
    }finally{
        setLoader(false);
    }
} 

    useEffect(()=>{
        if(selectedUrl)useFetchMyShortUrl();
    },[selectedUrl]);

  return (
    <div className='border'>
        <a
            href={`http://${subDomain}/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-indigo-50 text-indigo-600 font-medium rounded-full 
                        hover:bg-indigo-100 hover:text-indigo-700 transition"
            >
            {subDomain}/{shortUrl}
        </a>

        <p>Original: {originalUrl}</p>
        <p>Clicks: {clickCount}</p>

        <span>
            Created At : {dayjs (createdAt).format("MMM DD, YYYY")}
        </span>
        <CopyToClipboard
                onCopy={() => setIsCopied(true)}
                text={`${import.meta.env.VITE_REACT_SUBDOMAIN + "/" + `${shortUrl}`}`}
            >
                <div className="flex cursor-pointer gap-1 items-center bg-btnColor py-2  font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-black ">
                <button className="">{isCopied ? "Copied" : "Copy"}</button>
                {isCopied ? (
                    <LiaCheckSolid className="text-md" />
                ) : (
                    <IoCopy className="text-md" />
                )}
                </div>
            </CopyToClipboard>

            <div onClick={()=> analyticsHandler(shortUrl)}>
                <button>Analytics</button>
            </div>
            
            
            <React.Fragment>
                    <div className={`${
                    analyticsTogle ? "flex" : "hidden"
                }  max-h-96 sm:mt-0 mt-5 min-h-96 relative  border-t-2 w-[100%] overflow-hidden `}>
                        
                 {loader ? (
                <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
                    <div className="flex flex-col items-center gap-1">
                    <Hourglass
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                        />
                        <p className='text-slate-700'>Please Wait...</p>
                    </div>
                </div>
                ) : ( 
                    <>{analyticData.length === 0 && (
                        <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                            <h1 className=" text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                                No Data For This Time Period
                            </h1>
                            <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600 ">
                                Share your short link to view where your engagements are
                                coming from
                            </h3>
                        </div>
                    )}
                        <Graph graphData={analyticData} />
                    </>
                    )}
                    </div>

            </React.Fragment>
            
    </div>
    
  )
}

export default ShortenItem