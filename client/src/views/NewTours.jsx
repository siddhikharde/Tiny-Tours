import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import MultiSelect from '../components/MultiSelect';

function NewTours() {
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    cities: [],
    photos: []
  });

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
        <MultiSelect selectedItems={newTour.cities} 
        placeholder={"Enter Cites"}
        onAddItem={(val)=>{
              setNewTour({...newTour,
                cities:[...newTour.cities, val]
              })
        }}
        onRemoveItems={(val)=>{
         setNewTour({
          ...newTour,
          cities:newTour.cities.filter((city)=>city!= val),
         })
        }}/>
 

      </div>
    </div>
  );
}

export default NewTours;
