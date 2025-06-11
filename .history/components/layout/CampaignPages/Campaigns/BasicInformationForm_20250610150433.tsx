import React from 'react'
import {Input, Select} from '@/components/reuseables/inputs'


interface BasicInformationFormProps {
    formData: CreateCampaignInterface;
   handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
   errors: Record<string, string>;
}

const BasicInformationForm = (
    { formData, handleInputChange,errors }: BasicInformationFormProps
) => {

      const options = [
    { value: 'All Tenants', label: 'All Tenants' },
    { value: 'James', label: 'James' },
    { value: 'Wisdom', label: 'Wisdom' },

  ];
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

            <Select
            label="Mailling List"
            placeholder="Select your recipient"
            options={options}
            value={formData?.maillingList}
            onChange={handleSelectChange('country')}
            required
            error={errors.country}
          />
    </div>
  )
}

export default BasicInformationForm