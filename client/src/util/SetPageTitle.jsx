import React from 'react'

function SetPageTitle({title}) {
  return (
    <div>
      {
        document.title=`${title} | Tiny Tours`
      }
    </div>
  )
}

export default SetPageTitle
