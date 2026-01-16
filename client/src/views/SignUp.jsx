import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
function SignUp() {
    const [newUser, setNewUser]=useState({
        name:"",
        email:"",
        mobile:"",
        city:"",
        country:"",
        password:""
    });
  return (
    <div className='bg-[#FFFFFF] min-h-screen'>
      <div className='flex flex-col gap-3 w-[90%] md:w-[450px] border border-2 border-[#CBD5E1] rounded-xl m-5 shadow-2xl justify-center items-center mx-auto md:p-8 p-5'>

        <h1 className='text-[#0F172A] my-2 text-2xl font-bold'>Create Account</h1>
        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Name</h2>
          <Input type='text' placeholder={"Enter Your Name"} value={newUser.name} onChange={(e)=>{
         setNewUser({...newUser, name:e.target.value})
      }}/>
      
        </div>
        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Email</h2>
        <Input type='email' placeholder={"Enter Your Email"} value={newUser.email} onChange={(e)=>{
         setNewUser({...newUser, email:e.target.value})
      }}/>
      </div>
       <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Mobile</h2>
        <Input type='number' placeholder={"Enter Your Mobile"} value={newUser.mobile} onChange={(e)=>{
         setNewUser({...newUser, mobile:e.target.value})
      }}/>
      </div>
      
       <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>City</h2>
        <Input type='text' placeholder={"Enter Your City"} value={newUser.city} onChange={(e)=>{
         setNewUser({...newUser, city:e.target.value})
      }}/>
      </div>
      <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Country</h2>
        <Input type='text' placeholder={"Enter Country"} value={newUser.country} onChange={(e)=>{
         setNewUser({...newUser, country:e.target.value})
      }}/>
      </div>
      <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Password</h2>
        <Input type='password' placeholder={"Enter Password"} value={newUser.password} onChange={(e)=>{
         setNewUser({...newUser, password:e.target.value})
      }}/>
      </div>
      
      <Button title={"Sign Up"} variant={"primary"} size={"lg"}/>
      </div>
    </div>
  )
}

export default SignUp
