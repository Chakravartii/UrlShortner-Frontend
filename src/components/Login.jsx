import React, {useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';
const Login = () => {
    const navigate = useNavigate();
    const[loader,setLoader]=useState(false);
    const{setToken} = useStoreContext();

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors}
    } = useForm({
        defaultValues:{
            username:"",
            email:"",
            password:"",
        },
        mode: "onTouched",
    });

    const loginHandler = async(data)=>{
        setLoader(true);
        try{
            const {data:response} = await api.post(
                "/api/auth/public/login",
                data
            );
            //token in localStorage
            setToken(response.token);
            localStorage.setItem("JWT_TOKEN",JSON.stringify(response.token));
            toast.success("Loged In Successfully");
            reset();
            navigate("/dashboard");
        }catch(error){
            console.log(error);
            toast.error("LogIn failed");
        }finally{
            setLoader(false);
        }
    };

    return (
        <div
            className=' bg-slate-400 min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <h1 className='text-center font-serif text-btnColor fond-bold lg:text-3xl text-2xl'>
                    Login Here
                </h1>
                
                <hr className='mt-2 mb-3 text-black'/>

                <div>
                    <TextField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="UserName is required"
                        placeholder="Type your username"
                        register={register}
                        errors={errors}
                    />
                </div>

                <div>
                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="Password is required"
                        placeholder="Type your username"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>

                <button
                    type='submit'
                    disabled={loader}
                    className=''>
                        {loader? "Loading.....":"Login"}
                </button>

                <p>
                    Don't have an account?
                    <Link to='/register'>
                        <span> SignUp </span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default Login;