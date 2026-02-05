import React from 'react'
import Navbar from '../components/Navbar'
import bgImg from '../assets/hero-bg.jpg'
import Button from '../components/Button'
import { useNavigate } from 'react-router'
import Footer from '../components/Footer'
function Home() {
  const navigate = useNavigate();
  return (
    <div className='bg-[#F8FAFC] min-h-screen'>
      <Navbar />
      <div style={{ backgroundImage: `url(${bgImg})` }} className={`bg-[url(${bgImg})] bg-cover bg-center h-[75vh] m-auto  flex  px-5 flex-col gap-5 items-center justify-center bg-gray-900 bg-blend-overlay`}>
        <h1 className="text-4xl font-bold text-white  text-center ">Share Your Journey. Discover Theirs.</h1>
        <p className="  text-xl text-gray-300 mt-4 text-center">TripNest is a community where travelers post their tours,
          share experiences, and inspire others to explore the world.</p>
        <div className='flex gap-5'>
          <Button title="Explore Tours" variant='secondary' onClick={() => navigate("/dashboard")} />
          <Button title="Create Tour" variant='primary' onClick={() => navigate("/tours/new")} />
        </div>
      </div>
  <Footer/>
    </div>
  )
}

export default Home
