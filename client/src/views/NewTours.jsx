import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import MultiSelect from '../components/MultiSelect';
import Button from '../components/Button';
import axios from 'axios'
import {getUserJwtToken} from '/Utils.jsx'
import toast,{ Toaster } from 'react-hot-toast';


function NewTours() {
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    cites: [],
    photos: []
  });
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
