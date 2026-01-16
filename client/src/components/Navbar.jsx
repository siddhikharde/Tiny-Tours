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
      <div className='bg-[#FFFFFF] flex justify-between items-center px-5'>
      <Link to={"/"}> <img src={logoImg} alt="Tiny Tours"  className='h-18 cursor-pointer'/></Link> 
        <div>
            {userData.name?(
                <h2 className='felx cursor-pointer items-center justify-center text-xl text-[#0F172A] font-bold'> 
                {`Hello! ${userData.name.split(" ")[0]}`} <Button title={"Logout"} size="md" variant='danger'/></h2>
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
