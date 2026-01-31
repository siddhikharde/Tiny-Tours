import React, { useState ,useRef} from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import MultiSelect from '../components/MultiSelect';
import Button from '../components/Button';
import axios from 'axios'
import {getUserJwtToken} from '/Utils.jsx'
import toast,{ Toaster } from 'react-hot-toast';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";


function NewTours() {
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    cites: [],
    photos: []
  });
   const [progress, setProgress] = useState(0);
   const fileInputRef = useRef();
 const authenticator = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth");
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
  const addTour= async ()=>{
    const jwtToken=getUserJwtToken();
    console.log(jwtToken)
      const res = await axios.post(
        "http://localhost:5000/tours",
        newTour,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      )

    if(res.data.success){
     toast.success(res.data.message);
    }else{
      toast.error(res.data.message);
    }
  }

  return (
    <div>
      <Navbar />

      <div className='flex flex-col gap-3 w-[90%] md:w-[450px] border border-[#CBD5E1] rounded-xl m-5 shadow-2xl justify-center items-center mx-auto md:p-8 p-5'>

        <Input
          type="text"
          placeholder="Add Tour Title"
          value={newTour.title}
          onChange={(e) =>
            setNewTour({ ...newTour, title: e.target.value })
          }
        />

        <Input
          type="text"
          placeholder="Add Description"
          value={newTour.description}
          onChange={(e) =>
            setNewTour({ ...newTour, description: e.target.value })
          }
        />
        <MultiSelect selectedItems={newTour.cites} 
        placeholder={"Enter Cites"}
        onAddItem={(val)=>{
              setNewTour({...newTour,
                cites:[...newTour.cites, val]
              })
        }}
        onRemoveItems={(val)=>{
         setNewTour({
          ...newTour,
          cites:newTour.cites.filter((city)=>city!= val),
         })
        }}/>
 
       <Input
          type="date"
          placeholder="Enter Start Date"
          value={newTour.startDate}
          onChange={(e) =>
            setNewTour({ ...newTour, startDate: e.target.value })
          }
        />
        <Input
          type="date"
          placeholder="Enter end date"
          value={newTour.endDate}
          onChange={(e) =>
            setNewTour({ ...newTour, endDate: e.target.value })
          }
        />

        <Button title={"Add Tour"} variant='primary' size='lg'
        onClick={()=>{
          addTour();
        }}/>
      </div>
    </div>
  );
}

export default NewTours;
