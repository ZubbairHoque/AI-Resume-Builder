import { Plus } from 'lucide-react';
import React, { useCallback } from 'react'

function AddResume() {
  const onCreate = useCallback(() => {}, []);
  return (
    <div role='button' 
    className='p-[2px] cursor-pointer'
    onClick={onCreate}
    >
      <div className='
      py-24 h-[183px] flex flex-col
      rounded-lg gap-2 w-full max-w-full
      items-center justify-center
      border
      bg-white
      hover:bg-primary
      transition
      hover:shadow
      dark:bg-secondary'
      >
        <span>
          <Plus size="30px"/>
        </span>
        <p 
        className='text-sm font-semibold
        '
        >Blank Resume</p>
      </div>
    </div>
  )
}

export default AddResume