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
      <div className='flex flex-col gap-2 w-[350px] border border-2 border-[#CBD5E1] rounded-xl m-5 shadow-2xl justify-center items-center mx-auto p-5'>

        <h1 className='text-[#0F172A] text-2xl font-bold'>Create Account</h1>
        <Input type='text' placeholder={"Enter Your Name"} value={newUser.name} onChange={(e)=>{
         setNewUser({...newUser, name:e.target.value})
      }}/>
      
        <Input type='email' placeholder={"Enter Your Email"} value={newUser.email} onChange={(e)=>{
         setNewUser({...newUser, email:e.target.value})
      }}/>

        <Input type='number' placeholder={"Enter Your Mobile"} value={newUser.mobile} onChange={(e)=>{
         setNewUser({...newUser, mobile:e.target.value})
      }}/>

        <Input type='text' placeholder={"Enter Your City"} value={newUser.city} onChange={(e)=>{
         setNewUser({...newUser, city:e.target.value})
      }}/>
        <Input type='text' placeholder={"Enter Your Country"} value={newUser.country} onChange={(e)=>{
         setNewUser({...newUser, country:e.target.value})
      }}/>
        <Input type='password' placeholder={"Enter Your Name"} value={newUser.password} onChange={(e)=>{
         setNewUser({...newUser, password:e.target.value})
      }}/>
      
      <Button title={"Sign Up"} variant={"primary"} size={"lg"}/>
      </div>
    </div>
  )
}

export default SignUp
