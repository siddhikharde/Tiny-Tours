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
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
    <Navbar />

    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-12">
        Welcome,{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          {user.name || "User"}
        </span>
      </h1>

      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-center border border-white/40">

        <div className="flex justify-center">
          <div className="group relative w-48 h-48 rounded-full object-cover overflow-hidden border-[5px] border-indigo-400 shadow-lg cursor-pointer transition-all hover:scale-[1.03]">
            <img
              src={user.profilePhoto}
              alt="Profile"
              className=""
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {[
            ["Name", user.name],
            ["Email", user.email],
            ["Country", user.country],
            ["City", user.city],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center gap-6 bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition"
            >
              <span className="text-sm uppercase tracking-wider text-slate-400 w-24">
                {label}
              </span>
              <span className="text-lg font-medium text-slate-700">
                {value}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  </div>
);

}

export default Profile
