import React from 'react'

function PhotoViewer({imgUrl , index}) {
  return (
     <img
                        src={imgUrl}
                        alt={`Tour Photo ${index+1}`}
                        className='w-25 h-auto mt-2 rounded-md object-cover mx-1 cursor-pointer'/>
  )
}

export default PhotoViewer
