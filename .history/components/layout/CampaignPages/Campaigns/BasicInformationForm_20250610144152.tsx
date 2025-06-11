import React from 'react'
import Input from '@/components/reuseables/inputs'


interface BasicInformationFormProps {

}

const BasicInformationForm = () => {
  return (
    <div className='w-[525px] h-[660px] gap-[32px] flex flex-col items-center'>
        <h2 className='text-[14px] text-secondary-text'>Fill out key info to personalize and direct your campaign.</h2>
    </div>
  )
}

export default BasicInformationForm