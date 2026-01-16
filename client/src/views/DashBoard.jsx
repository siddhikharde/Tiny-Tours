import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SetPageTitle, getUserJwtToken } from '../../Utils'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


function DashBoard() {
     const [token, setToken]=useState();
     const [tours, setTours]=useState([]);
    const getTours=async (token)=>{
    const res=await axios.get("http://localhost:5000/tours", {
        headers:{
           Authorization:`Bearer ${token} `
        }
    })

    if(token){
        toast.success(res.data.message || "Tours loaded");
        setTours(res.data.data)
    }else{
        toast.error(res.data.message|| "Failed to load tours");
    }

   }
    useEffect(()=>{
        SetPageTitle({title:"Dashboard"});
        const jwtToken = getUserJwtToken()
    setToken(jwtToken)
    if(jwtToken){
        getTours(jwtToken);
        }
      
    },[])
   
   
    
  return (
    <div>
        <Navbar/>

      dashboard

      <Toaster/>
    </div>
  )
}

export default DashBoard
