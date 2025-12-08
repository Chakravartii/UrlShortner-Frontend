import React from 'react'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

import { duration } from '@mui/material/styles';

const CreatenNewShorten = ({setOpen,refetch}) => {
  const {token} = useStoreContext();
  const [loading,setLoading] = useState(false);

  const{
    register,
    handleSubmit,
    reset,
    formState:{errors},
  }= useForm({
    defaultValues:{
      originalUrl:"",
    },
    mode:"onTouched",
  });

  const createShortUrlHandler = async (data) =>{
    setLoading(true);
    try{
      const {data:res} = await api.post("/api/url/shorten",data,{
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:"Bearer "+token,
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${res.data.shortUrl}`
      navigator.clipboard.writeText(shortenUrl).then(()=>{
        toast.success("Short Url Copied to Clipboard"),{
          position: "bottom-center",
          className:"mb-5",
          duration:3000,
        }
      });
      // await refetch();
      reset();
      setOpen(false);
    }catch(error){
      toast.error("shortening url failed");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}>
          <h1>Create a new ShortUrl</h1>
          <div>
            <TextField
            label="Enter Url"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            mesage="Url is required"
            register={register}
            errors={errors}
            />
          </div>
          <button>
            {loading?"Loading":"create"}
          </button>
          {
            !loading && (
              <button 
                disabled={loading}
                onClick={()=>setOpen(false)}
              >
                <RxCross2/>
              </button>
            )
          }
      </form>
    </div>
  )
}

export default CreatenNewShorten
