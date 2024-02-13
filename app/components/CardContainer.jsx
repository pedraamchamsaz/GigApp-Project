import React from 'react'
import Card from './Card'

const CardContainer = (props) => {

  return (
    <div className='w-full flex'>
        <Card 
            {...props} />
    </div>
  )
}

export default CardContainer