import Image from 'next/image'
import React from 'react'

// mobile and desktop sidebar componenent wrapping application


const AppSideBar = () => {
  return (
    <div className='w-[242px] py-[16px] pl-[16px] h-[962px] bg-white border-r border-light-grey fixed top-0 left-0'>
        <div className='flex items-center justify-center'>
            <Image src={'/staqa.png'} height={150} width={150} alt='staqa logo'/>
        </div>
    </div>
  )
}

export default AppSideBar