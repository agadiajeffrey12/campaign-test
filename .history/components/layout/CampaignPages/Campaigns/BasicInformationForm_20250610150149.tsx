import React from 'react'
import {Input} from '@/components/reuseables/inputs'


interface BasicInformationFormProps {
    formData: CreateCampaignInterface;
   handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
   errors: Record<string, string>;
}

const BasicInformationForm = (
    { formData, handleInputChange,errors }: BasicInformationFormProps
) => {
  return (
    <div className='w-[525px] h-[660px] gap-[32px] flex flex-col items-center'>
        <h2 className='text-[14px] text-secondary-text font-[400]'>Fill out key info to personalize and direct your campaign.</h2>

           <Input
            label="Name"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={handleInputChange('name')}
            required
            error={errors?.name}
          />
    </div>
  )
}

export default BasicInformationForm