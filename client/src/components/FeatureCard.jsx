import React from 'react'

function FeatureCard(item, i) {
  return (
  <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
  )
}

export default FeatureCard
