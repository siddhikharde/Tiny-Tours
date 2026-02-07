import React from 'react'
import Navbar from '../components/Navbar'
import bgImg from '../assets/hero-bg.jpg'
import Button from '../components/Button'
import { useNavigate } from 'react-router'
import Footer from '../components/Footer'
import { features, steps } from '../config'
import StepsCard from '../components/stepsCard'
import FeatureCard from '../components/FeatureCard'
function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="bg-cover bg-center h-[80vh] flex flex-col gap-6 items-center justify-center text-center px-6 bg-black/60 bg-blend-overlay"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white max-w-3xl">
          Share Your Journey. <br />
          Discover Theirs.
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
          TripNest is a community where travelers post their tours, share real
          experiences, and inspire others to explore the world.
        </p>

        <div className="flex gap-5 mt-6">
          <Button
            title="Explore Tours"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          />
          <Button
            title="Create Tour"
            variant="primary"
            onClick={() => navigate("/tours/new")}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Why TripNest?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}
        </div>
      </div>


      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {steps.map((step, i) => (
              <StepsCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

      

      <Footer />

    </div>
  );
}

export default Home
