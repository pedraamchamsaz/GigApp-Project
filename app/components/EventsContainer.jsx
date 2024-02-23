"use client"

import React from 'react'
import FilterContainer from './FilterContainer'
import CardContainer from './CardContainer'

const EventsContainer = (props) => {
  return (
    <div className='mt-6'>
        <FilterContainer {...props}/>
        <CardContainer {...props} />
    </div>
  )
}

export default EventsContainer



{/* <div>
<InterestedEvents events={events}/>
</div> */}