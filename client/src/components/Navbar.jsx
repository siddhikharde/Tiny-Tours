import React, { useEffect, useState } from 'react'
import logoImg from '../assets/logo.png'
import {getUserData} from '/Utils.jsx'
import Button from './Button.jsx';
import { Link, useNavigate } from 'react-router';
function Navbar() {
    const navigate=useNavigate();
    const [userData, setUserData]=useState({});
    useEffect(()=>{
       setUserData(getUserData)
    },[])
  return (
    <div>
      <div className='bg-[#FFFFFF] flex justify-between items-center px-7'>
      <Link to={"/"}> <img src={logoImg} alt="Tiny Tours"  className='h-18 cursor-pointer'/></Link> 
        <div>
            
            {userData.name?(
                <div className='flex items-center justify-center gap-2 '>
                 <div className="text-xl font-bold bg-[#2563EB] cursor-pointer h-10 w-10 flex items-center justify-center rounded-full text-white">
  {userData?.name?.charAt(0).toUpperCase() || "U"}
</div>
                    <h2 className='md:flex cursor-pointer items-center hidden justify-center text-xl text-[#0F172A] font-bold'> 
                {`Hello! ${userData.name.split(" ")[0]}`} </h2>
                <Button title={"Logout"} size="md" variant='danger'/>
                </div>
            ):(
              <Button title={"Login"} variant='primary' size="md" onClick={()=>{
                navigate("/login");
              }}/>
            )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
