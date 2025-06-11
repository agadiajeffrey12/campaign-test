import React from 'react'

// This is a wrapper component for the campaign pages
interface WrapperProps {
    children?: React.ReactNode;
    type?: 'create' | 'edit' | 'view';
    viewType?:'campaign' | 'template';
    state: 'has-data' | 'no-data' | 'loading';
}

const Wrapper = (
    { children, type = 'create', viewType = 'campaign', state = 'has-data' }: WrapperProps
) => {
  return (
    <div className={``}>
       <div></div> 
      {children}
    </div>
  )
}

export default Wrapper

const DefaultHeader = () => {
    return(
        <div className='w-full flex justify-between'>
            
        </div>
    )
}