import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../components/Button';
function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        country: "",
        city: "",
        profilePhoto: ""
    })

    const getUser = async () => {
        const token = localStorage.getItem("JwtToken");
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (res.data.success === true) {
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }

        const data = res.data?.data;
        if (!data) {
            window.location.href = "/login";
        }
        setUser({
            name: data.name,
            email: data.email,
            country: data.country,
            city: data.city,
            profilePhoto: data.profilePhoto,
        })
    }
    useEffect(() => {

        getUser();

    }, [])
   return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Welcome, <span className="text-indigo-600">{user.name || "User"}</span> 
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex justify-center">
          <div className="relative w-44 h-44 cursor-pointer rounded-full object-cover border-4 border-indigo-500 shadow-md overflow-hidden">
            <img
              src={user.profilePhoto}
              alt="Profile"
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium w-24">Name</span>
            <span className="text-lg font-semibold text-gray-800">
              {user.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium w-24">Email</span>
            <span className="text-lg text-gray-700">{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium w-24">Country</span>
            <span className="text-lg text-gray-700">{user.country}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium w-24">City</span>
            <span className="text-lg text-gray-700">{user.city}</span>
          </div>

          <div className="pt-6 flex gap-4">
            <Button title="Edit Profile" size='md' />
              
            <Button title="Change Photo" size='md' variant='secondary'/>
            
            
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Profile
