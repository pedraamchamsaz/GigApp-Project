"use client"

import React from 'react'
import FilterContainer from './FilterContainer'
import CardContainer from './CardContainer'

const EventsContainer = (props) => {
  return (
    <div>
        <FilterContainer {...props}/>
        <CardContainer {...props} />
    </div>
  )
}

export default EventsContainer