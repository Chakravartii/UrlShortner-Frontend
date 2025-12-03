import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import { nav } from 'motion/react-client';
import api from '../api/api';
import toast from 'react-hot-toast';
const RegisterPage = () => {
    const navigate = useNavigate();
    const[loader,setLoader]=useState(false);
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

    const registerHandler = async(data)=>{
        setLoader(true);
        try{
            const {data:response} = await api.post(
                "/api/auth/public/register",
                data
            );

            reset();
            navigate("/login");
            toast.success("Registered Successfully");
        }catch(error){
            console.log(error);
            toast.error("Registration failed");
        }finally{
            setLoader(false);
        }
    };

    return (
        <div
            className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <h1 className='text-center font-serif text-btnColor fond-bold lg:text-3xl text-2xl'>
                    Register Here
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
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="Email is required"
                        placeholder="Type your email"
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
                        {loader? "Loading.....":"Register"}
                </button>

                <p>
                    Already have an account?
                    <Link to='/login'>
                        <span> Login </span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default RegisterPage