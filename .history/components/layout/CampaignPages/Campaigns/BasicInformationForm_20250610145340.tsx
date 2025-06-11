import React from 'react'
import {Input} from '@/components/reuseables/inputs'


interface BasicInformationFormProps {
    formData?: CreateCampaignInterface;
    setFormData?: React.Dispatch<React.SetStateAction<CreateCampaignInterface>>;
}

const BasicInformationForm = (
    { formData, setFormData }: BasicInformationFormProps
) => {
  return (
    <div className='w-[525px] h-[660px] gap-[32px] flex flex-col items-center'>
        <h2 className='text-[14px] text-secondary-text font-[400]'>Fill out key info to personalize and direct your campaign.</h2>

        <Input 
        hasLabel
            label='Campaign name'
            placeholder='Enter campaign name'
            className='w-full'
        />
    </div>
  )
}

export default BasicInformationForm