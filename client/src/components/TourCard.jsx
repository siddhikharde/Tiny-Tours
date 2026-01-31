import { Building2, Footprints, FlagTriangleRight } from 'lucide-react'
import React from 'react'
import Avtar from './Avtar';
import PhotoViewer from './PhotoViewer';

function TourCard({id, title, description,cites, photos, user, startDate, endDate, updatedAt}) {
    const {name, email}=user;
  return (
    <div className='border rounded-2xl py-2 mb-4 px-4 '>
        <h2 className='text-xl'>{title}</h2>
        <p className='text-xs text-gray-500'>{description}</p>
        <p className=' flex gap-2 text-sm items-center my-2 '>
            <Footprints className='mx-2 h-6 w-6'/> Started on: {""}
            {new Date(startDate).toLocaleDateString()}
            <FlagTriangleRight /> Ended on  {new Date(endDate).toLocaleDateString()}
        </p>
                <p className='my-2'>
            <Building2 className='inline-block mr-1'/>{" "}
            {
                cites.map((city)=>{
                    return (
                        <span 
                        key={city}
                        className='mr-2 text-sm bg-gray-300 px-4 py-0.5 rounded-full'>
                            {city}
                        </span>
                    )
                })
            }
        </p>
        <div className='flex gap-2'>
            Posted by:<div className='flex gap-1 '>
                <Avtar name={name} size='sm'/><strong>{name}</strong> {email} 
            </div>
            </div>
           <div className='flex overflow-x-auto scroll-auto'>
             {
                photos.map((photo, index)=>{
                    return (
                       <PhotoViewer imgUrl={photo} index={index}/>

                    )
                })
            }
           </div>
    </div> 
  )
}

export default TourCard
