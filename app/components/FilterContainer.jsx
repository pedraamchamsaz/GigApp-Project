import React from 'react'
import RefineButton from './RefineButton'
import Dropdown from './Dropdown'

const FilterContainer = (props) => {
  return (
    <div className='flex justify-between'>
        <Dropdown/>
        <RefineButton {...props}/>
    </div>
  )
}

export default FilterContainer