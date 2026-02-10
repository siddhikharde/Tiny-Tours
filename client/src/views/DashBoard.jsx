import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SetPageTitle, getUserJwtToken } from '../../Utils'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { Plus } from 'lucide-react'
import { Link } from 'react-router';
import TourCard from '../components/TourCard';

function DashBoard() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTours = async () => {
        try {
            setLoading(true);
            const jwtToken = getUserJwtToken()
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tours`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message || "Tours loaded");
                setTours(res.data.data)
            } else {
                toast.error(res.data.message || "Failed to load tours");
            }
        } catch (error) {
            toast.error("Error loading tours");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        SetPageTitle({ title: "Dashboard" });
        loadTours();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-800">
                        Your Tours
                    </h1>

                    <span className="text-sm text-slate-500">
                        {tours.length} tour{tours.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-gray-500">Loading tours...</p>
                    </div>
                ) : tours.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-gray-500">No tours yet. Create one to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {tours.map((item) => (
                            <TourCard key={item.id} {...item} />
                        ))}
                    </div>
                )}
            </div>

            <Link
                to="/tours/new"
                className="group fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 font-semibold rounded-2xl
                         bg-gradient-to-r from-emerald-500 to-green-500 text-white
                         shadow-xl shadow-green-200 hover:shadow-green-300
                         hover:scale-105 transition-all"
            >
                <Plus className="group-hover:rotate-90 transition" />
                Add Tour
            </Link>

            <Toaster />
        </div>
    );
}

export default DashBoard