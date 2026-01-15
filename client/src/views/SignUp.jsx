import React, { useState } from 'react'
import Input from '../components/Input'
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
      <div className='flex flex-col gap-2 w-[25%] border border-2 border-[#2563EB] rounded-xl m-5 shadow-2xl justify-center items-center mx-auto p-5'>
        <Input type='text' placeholder={"Enter Your Name"} value={newUser.name} onChange={(e)=>{
         setNewUser({...newUser, name:e.target.value})
      }}/>

      
      </div>
    </div>
  )
}

export default SignUp
