import React from 'react'
import RefineButton from './RefineButton'
import Dropdown from './Dropdown'

const FilterContainer = () => {
  return (
    <div className='flex justify-between'>
        <Dropdown />
        <RefineButton />
    </div>
  )
}

export default FilterContainer