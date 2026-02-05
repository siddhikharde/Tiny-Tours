import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

function Profile() {
    const userData=JSON.parse(localStorage.getItem("userData"));
    const [user, setUser]=useState({
        name:"",
        email:"",
        country:"",
        city:"",
    })

    useEffect(()=>{
        if(!userData.name){
            window.location.href="/login";
        }else{
            setUser({
                name:userData.name,
                email:userData.email,
                country:userData.country,
                city:userData.city,
            });
            console.log(user);
        }



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
