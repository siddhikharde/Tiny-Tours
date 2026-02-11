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
import PhotoViewer from '../components/PhotoViewer';


function EditTours() {
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
                setNewTour({...newTour, photos:[...newTour.photos, uploadResponse.url]});
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
  const editTour= async ()=>{
    const jwtToken=getUserJwtToken();
    console.log(jwtToken)
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/tours/${newTour.id}`,
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
        <div className='w-full flex flex-col'>
        <div className='flex items-center justify-start w-full'>
            {
            newTour.photos.length>0 && newTour.photos.map((photo, index)=>(
             <PhotoViewer key={index} imgUrl={photo} showDelete={true} onDelete={(url)=>{
              setNewTour({...newTour,
                photos:newTour.photos.filter((p)=>p!== url)
              })
             }}/>
            ))
          }
        </div>
          {progress<100 && progress !== 0 ?(<span className='text-sm text-blue-600'>Uploading {progress}%</span>):""}
        </div>
        <input  type='file' ref={fileInputRef}
        className='border border-[#E5E7EB] m-2 px-4 text-[17px] text-[#111827] py-1 rounded-xl focus:outline-1 outline-[#2563EB] w-full'
        onChange={(e)=>{
          if(e.target.files.length>0){
            handleUpload();
          }
        }}/>

        <Button title={"Edit  Tour"} variant='primary' size='lg'
        onClick={()=>{
          editTour();
        }}/>
      </div>
    </div>
  );
}

export default  EditTours;
