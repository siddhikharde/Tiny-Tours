import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
function Profile() {
    const [user, setUser]=useState({
        name:"",
        email:"",
        country:"",
        city:"",
        profilePhoto:""
    })

    const getUser=async()=>{
        const token=localStorage.getItem("JwtToken");
        const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`,{
            headers:{
                Authorization:`Bearer ${token}`
    }}     )

    if(res.data.success===true){
        toast.success(res.data.message);
    }    else{
        toast.error(res.data.message);
    }

    const data=res.data?.data;
    if(!data){
        window.location.href="/login";
    }
    setUser({
        name:data.name,
        email:data.email,
        country:data.country,
        city:data.city,
        profilePhoto:data.profilePhoto,
    })
    }
    useEffect(()=>{
       
            getUser();
      
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto p-4 md:p-8'>
            <h1 className='text-3xl font-bold mb-6'>Profile</h1>
            <div className='bg-white shadow-md rounded-lg p-6'>
                <p className='text-xl mb-4'><span className='font-semibold'>Name:</span> {user.name}</p>
                <p className='text-xl mb-4'><span className='font-semibold'>Email:</span> {user.email}</p>
                <p className='text-xl mb-4'><span className='font-semibold'>Country:</span> {user.country}</p>
                <p className='text-xl mb-4'><span className='font-semibold'>City:</span> {user.city}</p>
            </div>
        </div>
      
    </div>
  )
}

export default Profile
