import React, { useState } from 'react'
import Input from '../components/Input'

function MultiSelect({selectedItems,placeholder, onRemoveItems, onAddItem}) {
    const [newItem , setNewItem]=useState("");

  return (
    <div className='flex flex-wrap '>
      {
        selectedItems.map((item, index)=>{
            return(
                <>
                <div key={index} className='border bg-gray-300 text-[15px] px-2 py-1  rounded-2xl text-gray-500 hover:text-gray-800 m-2'>
                  {item}{" "} <span className='cursor-pointer'
                  onClick={()=>{
                    onRemoveItems(item)
                  }}> x</span>
                </div>
                </>
            )
        })
        
      }
      <Input
               type={"text"} placeholder={placeholder} 
               value={newItem}
               onChange={(e)=>{
                setNewItem(e.target.value);
               }}
               onKeyDown={(e)=>{
                if(e.key=== 'Enter'){
                  if(e.target.value!=""){
                    onAddItem(e.target.value)
                  }
                  setNewItem("")
                }

               }}/>
    </div>
  )
}

export default MultiSelect
