import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SetPageTitle, getUserJwtToken } from '../../Utils'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import {Plus} from 'lucide-react'
import { Link } from 'react-router';
import TourCard from '../components/TourCard';

function DashBoard() {
    const [tours, setTours] = useState([]);
    const loadTours = async () => {
 const jwtToken = getUserJwtToken()
        const res = await axios.get("http://localhost:5000/tours", {
            headers: {
                Authorization: `Bearer ${jwtToken} `
            }
        })
        if (res.data.success) {
            toast.success(res.data.message || "Tours loaded");
            setTours(res.data.data)
        } else {
            toast.error(res.data.message || "Failed to load tours");
        }
    }
    useEffect(() => {
        SetPageTitle({ title: "Dashboard" });
            loadTours();
    }, [])
    return (
        <div>
            <Navbar />
             <div className='bg-[#FFFFFF] min-h-screen w-2/3 mx-auto'>

            {
                tours.map((item, index)=>{
                    return <TourCard key={index} {...item}/>
                })
            }
            </div>
       <Link to={"/tours/new"} className='fixed bottom-10 right-10 flex gap-2 p-4 font-bold rounded-2xl bg-[#22C55E]'>
          <Plus /> Add Tours
       </Link>
            <Toaster />
        </div>
    )
}

export default DashBoard
