import React from 'react'
import { useState, useEffect } from 'react'
import Input from '../components/Input'
import SetPageTitle from '../util/SetPageTitle';
import Button from '../components/Button'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import {Link} from 'react-router'
function Login() {
    useEffect(()=>{
    SetPageTitle({title:"Login"})
  },[]);

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: ""
  });
    const checkLoginUser=async()=>{
    const response=await axios.post("http://localhost:5000/login", loginUser);
    if(response.data.success){
      toast.success(response.data.message || "Login Successful");
      setLoginUser({
        email:"",
        password:""
      })

      const {token, data}=response.data;
      localStorage.setItem("JwtToken", token);
      localStorage.setItem("userData", JSON.stringify(data));

      
    }else{
      toast.error(response.data.message || "Invalid email or password.");
    }
  }
  return (
    <div className='bg-[#FFFFFF] min-h-screen'>
      <h1 className='text-center p-2 mt-5 text-4xl font-bold text-[#0F172A]' >Welcome Back</h1>
      <p className='text-center text-[15px] text-gray-500'>Login to continue your journey</p>
      <div className='flex flex-col mt-10 gap-3 w-[90%] md:w-[450px] border border-2 border-[#CBD5E1] rounded-xl m-5 shadow-2xl justify-center items-center mx-auto md:p-8 p-5'>
        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Email</h2>
          <Input type='email' placeholder={"Enter Your Email"} value={loginUser.email} onChange={(e) => {
            setLoginUser({ ...loginUser, email: e.target.value })
          }} />
        </div>
        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Password</h2>
          <Input type='password' placeholder={"Enter Password"} value={loginUser.password} onChange={(e) => {
            setLoginUser({ ...loginUser, password: e.target.value })
          }} />
        </div>
        <Button title={"Login"} variant={"primary"} size={"md"} onClick={() => {
           checkLoginUser();
        }} />
        <Link to={"/signUp"} className='text-[15px] text-blue-900'>Don't have an Account ? Sign Up</Link>
      </div>
      <Toaster/>
    </div>
  )
}

export default Login
