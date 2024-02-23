import React from 'react'
import Card from './Card'
import ProfileEvents from './ProfileEvents'

const CardContainer = (props) => {

  return (
    <div className='w-full flex'>
      {props.list === 'RECOMMENDED GIGS' ?
        <Card 
            {...props} /> :
        
        
        <ProfileEvents 
        {...props}/>
        
        }
    </div>
  )
}

export default CardContainer



{/* <InterestedEvents events={events}/> */}
