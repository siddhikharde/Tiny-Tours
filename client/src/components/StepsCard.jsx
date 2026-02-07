import React from 'react'

function StepsCard({ step, index }) {
  return (
    <div key={index}>
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xl">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
  )
}

export default StepsCard
