import React from 'react';

function Input({
  type = "text",
  value,
  placeholder,
  onChange,
  onKeyDown,
  name,
  className = ""
}) {
  return (
    <input
      type={type}
      name={name}                 
      value={value || ""}        
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`border border-[#E5E7EB] m-2 px-4 text-[17px] text-[#111827] py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full ${className}`}
    />
  );
}

export default Input;