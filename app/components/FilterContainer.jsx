import React from 'react'
import RefineButton from './RefineButton'
import RefineButtonUser from './RefineButtonUser'
import Dropdown from './Dropdown'

const FilterContainer = (props) => {
  return (
    <div className='flex justify-between px-8'>
        <Dropdown {...props}/>
        {props.list === 'RECOMMENDED GIGS' ?
        <RefineButton {...props}/> :
        <RefineButtonUser {...props} />}
    </div>
  )
}

export default FilterContainer