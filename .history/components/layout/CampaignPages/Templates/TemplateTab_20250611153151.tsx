import React from 'react'

const TemplateTab = () => {
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[20px] font-[400] text-dark-blue'>Your templates</h2>
                <p className='text-[14px] text-secondary-text'>View and manage the templates you’ve created.</p>
            </div>
        </div>
    </div>
  )
}

export default TemplateTab