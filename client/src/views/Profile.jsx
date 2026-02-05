import React, { useEffect, useState } from 'react'

function Profile() {
    const userData=JSON.parse(localStorage.getItem("userData"));
    const [user, setUser]=useState({
        name:"",
        email:"",
        country:"",
        city:"",
    })

    useEffect(()=>{
        if(!userData.name){
            window.location.href="/login";
        }else{
            setUser({
                name:userData.name,
                email:userData.email,
                country:userData.country,
                city:userData.city,
            });
            console.log(user);
        }



    },[])
  return (
    <div>
      
    </div>
  )
}

export default Profile
