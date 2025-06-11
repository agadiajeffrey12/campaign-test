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
      {children}
    </div>
  )
}

export default Wrapper