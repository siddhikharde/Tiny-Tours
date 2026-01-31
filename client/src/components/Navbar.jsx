import React, { useEffect, useState } from 'react'
import logoImg from '../assets/logo.png'
import {getUserData} from '/Utils.jsx'
import Button from './Button.jsx';
import { Link, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import Avtar from './Avtar.jsx';
function Navbar() {
    const navigate=useNavigate();
    const [userData, setUserData]=useState({});
    useEffect(()=>{
       setUserData(getUserData())
    },[])

    const logout=()=>{
        localStorage.clear();
        toast.error("Logout Successfully.")
        setTimeout(()=>{
           navigate("/login")
        },1500);
    }
  return (
    <div>
      <div className='bg-[#FFFFFF] flex justify-between items-center px-3 md:px-7'>
      <Link to={"/"}> <img src={logoImg} alt="Tiny Tours"  className='h-18 cursor-pointer'/></Link> 
        <div>
            
            {userData.name?(
                <div className='flex items-center justify-center gap-2 '>
                <Avtar name={userData.name} size='lg'/>
                    <h2 className='md:flex cursor-pointer items-center hidden justify-center text-xl text-[#0F172A] font-bold'> 
                {`Hello! ${userData.name.split(" ")[0]}`} </h2>
                <Button title={"Logout"} size="md" variant='danger' onClick={logout}/>
                </div>
            ):(
              <Button title={"Login"} variant='primary' size="md" onClick={()=>{
                navigate("/login");
              }}/>
            )}
        </div>
        <Toaster/>
      </div>
    </div>
  )
}

export default Navbar
