import { Building2, Footprints, FlagTriangleRight } from 'lucide-react'
import React from 'react'
import Avtar from './Avtar';
import PhotoViewer from './PhotoViewer';

function TourCard({ id, title, description, cites, photos, user, startDate, endDate, updatedAt }) {
    const { name, email } = user;
    return (
        <div className='border bg-white border-gray-200 rounded-xl p-4 m-4 shadow-sm md:hover:shadow-lg transition-shadow duration-300'>
            <h2 className='text-xl font-bold  '>{title}</h2>
            <p className='text-sm   '>{description}</p>
            <p className='text-sm text-gray-600 my-2 flex items-center gap-2'>
                <Footprints className='m-0.5  ' /> Started on: {""}
                {new Date(startDate).toLocaleDateString()}
                <FlagTriangleRight /> Ended on  {new Date(endDate).toLocaleDateString()}
            </p>
            <p className='text-sm text-gray-600 my-2 flex items-center gap-2'>
                <Building2 className='inline-block mr-1' />{" "}
                {
                    cites.map((city) => {
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
            
            <div className='w-full overflow-x-auto py-2'>
                <div className="flex gap-3 min-w-max">
                    {photos?.map((photo, index) => (
                        <PhotoViewer
                            key={photo || index}
                            imgUrl={photo}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            <div className='flex gap-2 text-sm mt-4 items-center text-gray-600'>
                Posted by:<div className='flex gap-1 '>
                    <Avtar name={name} size='sm' />{name}{email}
                </div>
            </div>
        </div>
    )
}

export default TourCard
