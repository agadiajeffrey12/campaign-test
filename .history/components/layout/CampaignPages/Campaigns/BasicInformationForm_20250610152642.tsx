import React from 'react'
import {Input, Select} from '@/components/reuseables/inputs'
import { PrimaryButton, TertiaryButton } from '@/components/reuseables/buttons';


interface BasicInformationFormProps {
    formData: CreateCampaignInterface;
   handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
   errors: Record<string, string>;
   handleSelectChange: (field: string) => (value: string | number) => void;
}

const BasicInformationForm = (
    { formData, handleInputChange,errors,handleSelectChange }: BasicInformationFormProps
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
            onChange={handleSelectChange('maillingList')}
            required
            error={errors.country}
          />

           <Input
            label="Sender's Email"
            placeholder="hello@gmail.com"
            value={formData?.sendersEmail}
            onChange={handleInputChange('sendersEmail')}
            required
            error={errors?.name}
            hasPromptText
            promptText="Preferable to use your domain name e.g johndoe@straqa.com"
          />
           <Input
            label="Sender's Name"
            placeholder="John Doe"
            value={formData?.sendersName}
            onChange={handleInputChange('sendersName')}
            required
            error={errors?.name}
          />
           <Input
            label="Name of email (subject)"
            placeholder="hello@alignui.com"
            value={formData?.sendersName}
            onChange={handleInputChange('nameOfEmail')}
            required
            error={errors?.name}
          />
          <PrimaryButton fullWidth> 
            Save and Continue
          </PrimaryButton>
          <TertiaryButton fullWidth>
            Cancel
            </TertiaryButton>
    </div>
  )
}

export default BasicInformationForm