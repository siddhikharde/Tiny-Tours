import React from 'react'
import { useState } from 'react';
import { X, Trash } from 'lucide-react';

function PhotoPriview({imgUrl, show, onclose }){
    if(!show) return null;
    return(
        <div className='fixed top-0 right-0 w-full h-full flex items-center justify-center py-10 bg-gray-800 '>
            <span
            onClick={onclose} 
            className='text-white absolute top-5 right-5 text-3xl cursor-pointer'>
               <X />

            </span>
 <img
                        src={imgUrl}
                        alt="priview"
                        className='max-w-full max-h-full rounded-md'/>
        </div>
    )

}

function PhotoViewer({imgUrl , index, showDelete=false, onDelete}) {
    const [showPriview, setShowPrieview]=useState(false);
  return (
    <div className="relative shadow-md m-1  rounded-xl"> 
    {
        showDelete && (
            <span className='absolute right-2 top-2 h-5 text-red-600 cursor-pointer' onClick={()=>{
                onDelete(imgUrl);
            }}><Trash size={14}/></span>
        )
    }
    <img
                        src={imgUrl}
                        alt={`Tour Photo ${index+1}`}
                        className='w-25 h-auto mt-2 rounded-md object-cover mx-1 cursor-pointer'
                        onClick={()=>{
                            setShowPrieview(true)
                        }}/>
   <PhotoPriview imgUrl={imgUrl} show={showPriview} onclose={()=>{
    setShowPrieview(false)

   }}/>
 </div> )
  
}

export default PhotoViewer
