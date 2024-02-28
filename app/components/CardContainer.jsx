import React from 'react'
import Card from './Card'
import ProfileEvents from './ProfileEvents'
import InterestedEvents from './Interested'

const CardContainer = (props) => {

  return (
    <div className='w-full flex'>
      {props.list === 'RECOMMENDED GIGS' ? (
        <Card {...props} />
      ) : props.list === 'INTERESTED' ? (
        <InterestedEvents {...props} />
      ) : (
        <ProfileEvents {...props} />
      )}
    </div>
  )
}

export default CardContainer



{/* <InterestedEvents events={events}/> */}
