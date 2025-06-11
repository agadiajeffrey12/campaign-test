import React from 'react'
import { BasicInformationFormProps } from './BasicInformationForm'
import { Input, Select } from '@/components/reuseables/inputs'
import { PrimaryButton, TertiaryButton } from '@/components/reuseables/buttons'



const ConfirmAndSend = (
        { formData, handleInputChange,errors,handleSelectChange,handleStepChange }: BasicInformationFormProps
) => {

     const options = [
    { value: 'All Tenants', label: 'All Tenants' },
    { value: 'James', label: 'James' },
    { value: 'Wisdom', label: 'Wisdom' },

  ];
  return (
    <div className='w-[830px] h-[1700px] flex items-center flex-col gap-[32px]'>
        <h2 className='text-[14px] text-secondary-text font-[400]'>Confirm your message and delivery settings.</h2>
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
          <TertiaryButton fullWidth onClick={() => handleStepChange && handleStepChange(2)}>
            Cancel
            </TertiaryButton>
    </div>
  )
}

export default ConfirmAndSend