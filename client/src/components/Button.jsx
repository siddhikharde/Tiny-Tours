import React from 'react'
const variants={
   primary: "bg-[#F97316] text-white",
  secondary: "bg-[#E5E7EB] text-[#111827]",
}


const sizes={
   sm: "text-sm px-3 py-1",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

function Button({variant="primary", size="lg", title}) {
  return (
    
     <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-md
        m-4
        transition
        hover:opacity-90
      `}
    >
{title}
    </button>
  )
}

export default Button ;

