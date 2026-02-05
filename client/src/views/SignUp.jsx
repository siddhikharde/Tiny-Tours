import React, { useEffect, useState , useRef} from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router';
import { SetPageTitle } from '/Utils.jsx';
import Navbar from '../components/Navbar';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
function SignUp() {
  useEffect(() => {
    SetPageTitle({ title: "SignUp" });
  }, [])
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    password: "",
    profilePhoto:"",
  });

   const [progress, setProgress] = useState(0);
     const fileInputRef = useRef();
  const authenticator = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };
     const handleUpload = async () => {
                const fileInput = fileInputRef.current;
                if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                    alert("Please select a file to upload");
                    return;
                }
    
                const file = fileInput.files[0];
                let authParams;
                try {
                    authParams = await authenticator();
                } catch (authError) {
                    console.error("Failed to authenticate for upload:", authError);
                    return;
                }
                const { signature, expire, token, publicKey } = authParams;
                try {
                    const uploadResponse = await upload({
                        expire,
                        token,
                        signature,
                        publicKey,
                        file,
                        fileName: file.name,
                        onProgress: (event) => {
                            setProgress((event.loaded / event.total) * 100);
                        },
                    });
                    console.log("Upload response:", uploadResponse);
                    setNewUser({...newUser, profilePhoto: uploadResponse.url});
                    fileInputRef.current.value = "";
                } catch (error) {
                    if (error instanceof ImageKitAbortError) {
                        console.error("Upload aborted:", error.reason);
                    } else if (error instanceof ImageKitInvalidRequestError) {
                        console.error("Invalid request:", error.message);
                    } else if (error instanceof ImageKitUploadNetworkError) {
                        console.error("Network error:", error.message);
                    } else if (error instanceof ImageKitServerError) {
                        console.error("Server error:", error.message);
                    } else {
                        console.error("Upload error:", error);
                    }
                }
            };
    
  const createUser = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signUp`, newUser);
    if (response.data.success) {
      toast.success(response.data.message || "Account Created Successfully", { id: "SignUpSuccess" });
      setNewUser({
        name: "", email: "", password: "", mobile: "", city: "", country: "",
      })
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    } else {
      toast.error(response.data.message || "Signup failed", { id: "errorMessage" });
    }
  }
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex flex-col gap-3 w-[90%]  border border-2 border-[#CBD5E1] rounded-xl m-5 shadow-2xl justify-center items-center mx-auto md:p-8 p-5'>

        <h1 className='text-[#0F172A] my-2 text-2xl font-bold'>Create Account</h1>
        <div className='flex md:flex-row flex-col w-full gap-3'>
          <div className='flex gap-1 flex-col justify-center items-start w-full '>
            <h2 className='px-3 text-[16px] '>Name</h2>
            <Input type='text' placeholder={"Enter Your Name"} value={newUser.name} onChange={(e) => {
              setNewUser({ ...newUser, name: e.target.value })
            }} />

          </div>
          <div className='flex gap-1 flex-col justify-center items-start w-full '>
            <h2 className='px-3 text-[16px] '>Email</h2>
            <Input type='email' placeholder={"Enter Your Email"} value={newUser.email} onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value })
            }} />
          </div>
        </div>
        
        <div className='flex md:flex-row flex-col w-full gap-3'>
        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Mobile</h2>
          <Input type='number' placeholder={"Enter Your Mobile"} value={newUser.mobile} onChange={(e) => {
            setNewUser({ ...newUser, mobile: e.target.value })
          }} />
        </div>

        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>City</h2>
          <Input type='text' placeholder={"Enter Your City"} value={newUser.city} onChange={(e) => {
            setNewUser({ ...newUser, city: e.target.value })
          }} />
        </div>
</div>

<div className='flex md:flex-row flex-col w-full gap-3'>
        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Country</h2>
          <Input type='text' placeholder={"Enter Country"} value={newUser.country} onChange={(e) => {
            setNewUser({ ...newUser, country: e.target.value })
          }} />
        </div>
        <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Password</h2>
          <Input type='password' placeholder={"Enter Password"} value={newUser.password} onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value })
          }} />
        </div>
        </div>
        <div className='flex md:flex-row flex-col w-full gap-3'>
          <div className='flex gap-1 flex-col justify-center items-start w-full '>
          <h2 className='px-3 text-[16px] '>Profile Photo (optional)</h2>
         <input  type='file' ref={fileInputRef}
        className='border border-[#E5E7EB] m-2 px-4 text-[17px] text-[#111827] py-1 rounded-xl focus:outline-1 outline-[#2563EB] w-full'
        onChange={(e)=>{
          if(e.target.files.length>0){
            handleUpload();
          }
        }}/>
        </div>
        </div>
        

        <Button title={"Sign Up"} variant={"primary"} size={"lg"} onClick={() => {
          createUser();
        }} />

        <Link to={"/login"} className='text-[15px] text-blue-900'>Already have an Account ? Login</Link>
      </div>
      <Toaster />
    </div>
  )
}

export default SignUp;
