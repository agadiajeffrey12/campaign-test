import React, { useState, useRef } from 'react'
import { BasicInformationFormProps } from './BasicInformationForm'
import { Input, Select } from '@/components/reuseables/inputs'
import { PrimaryButton, TertiaryButton } from '@/components/reuseables/buttons'

const ConfirmAndSend = (
        { formData, handleInputChange, errors, handleSelectChange, handleStepChange }: BasicInformationFormProps
) => {
  const [emailBody, setEmailBody] = useState(formData?.message || '');
  const textareaRef = useRef(null);

  const options = [
    { value: 'All Tenants', label: 'All Tenants' },
    { value: 'James', label: 'James' },
    { value: 'Wisdom', label: 'Wisdom' },
  ];

  const templateOptions = [
    { value: 'Welcome Template', label: 'Welcome Template' },
    { value: 'Notification Template', label: 'Notification Template' },
    { value: 'Thank You Template', label: 'Thank You Template' },
  ];

  const handleTextFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    textareaRef.current?.focus();
  };

  const handleEmailBodyChange = (e) => {
    const value = e.target.value;
    setEmailBody(value);
    if (handleInputChange) {
      handleInputChange('emailBody')({ target: { value } });
    }
  };

  return (
    <div className='w-[830px] min-h-[1700px] flex flex-col space-y-[32px]'>
      <h2 className='text-[14px] text-center text-secondary-text font-[400]'>
        Confirm your message and delivery settings.
      </h2>

      <Input
        label="Name"
        placeholder="Enter your full name"
        value={formData?.name}
        onChange={handleInputChange('name')}
        required
        error={errors?.name}
      />

      <Select
        label="Mailing List"
        placeholder="Select your recipient"
        options={options}
        value={formData?.maillingList}
        onChange={handleSelectChange('maillingList')}
        required
        error={errors?.maillingList}
      />

      <Input
        label="Sender's Email"
        placeholder="hello@gmail.com"
        value={formData?.sendersEmail}
        onChange={handleInputChange('sendersEmail')}
        required
        error={errors?.sendersEmail}
        hasPromptText
        promptText="Preferable to use your domain name e.g johndoe@straqa.com"
      />

      <Input
        label="Sender's Name"
        placeholder="John Doe"
        value={formData?.sendersName}
        onChange={handleInputChange('sendersName')}
        required
        error={errors?.sendersName}
      />

      <Input
        label="Name of email (subject)"
        placeholder="Thanks for Coming"
        value={formData?.nameOfEmail}
        onChange={handleInputChange('nameOfEmail')}
        required
        error={errors?.nameOfEmail}
      />

      <div className="space-y-[16px]">
        <h2 className='text-[16px] font-[400] text-left'>Email body</h2>
        
        <Select
          label="Template"
          placeholder="Select template"
          options={templateOptions}
          value={formData?.template}
          onChange={handleSelectChange('template')}
          required
          error={errors?.template}
        />

        {/* Text Editor */}
        <div className="space-y-[8px]">
          <label className="block text-[14px] font-[400] text-gray-700">
            Message Content
          </label>
          
          {/* Formatting Toolbar */}
          <div className="flex items-center space-x-[8px] p-[12px] border border-gray-300 rounded-t-[8px] bg-gray-50">
            <button
              type="button"
              onClick={() => handleTextFormat('bold')}
              className="p-[4px] hover:bg-gray-200 rounded text-[14px] font-bold"
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('italic')}
              className="p-[4px] hover:bg-gray-200 rounded text-[14px] italic"
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('underline')}
              className="p-[4px] hover:bg-gray-200 rounded text-[14px] underline"
              title="Underline"
            >
              U
            </button>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-[8px]"></div>
            <button
              type="button"
              onClick={() => handleTextFormat('insertUnorderedList')}
              className="p-[4px] hover:bg-gray-200 rounded text-[14px]"
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('insertOrderedList')}
              className="p-[4px] hover:bg-gray-200 rounded text-[14px]"
              title="Numbered List"
            >
              1.
            </button>
          </div>

          {/* Text Area */}
          <div
            ref={textareaRef}
            contentEditable
            suppressContentEditableWarning={true}
            className="w-full min-h-[200px] p-[16px] border border-gray-300 border-t-0 rounded-b-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ 
              fontSize: '14px',
              lineHeight: '1.5',
              fontFamily: 'inherit'
            }}
            onInput={(e) => {
              const value = e.target.textContent || '';
              setEmailBody(value);
              if (handleInputChange) {
                handleInputChange('emailBody')({ target: { value } });
              }
            }}
            placeholder="Type your message here..."
          >
            {emailBody}
          </div>
          
          {/* Character Count */}
          <div className="text-right text-[12px] text-gray-500">
            {emailBody.length} characters
          </div>
        </div>
      </div>

      {/* Launch Campaign Section */}
      <div className="space-y-[16px]">
        <h2 className='text-[16px] font-[400] text-left'>Launching the campaign</h2>
        
        <div className="space-y-[12px]">
          <div className="flex items-center space-x-[12px]">
            <input
              type="radio"
              id="sendNow"
              name="campaignTiming"
              value="sendNow"
              defaultChecked
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="sendNow" className="text-[14px] font-[400]">
              Send now
            </label>
          </div>
          
          <div className="flex items-center space-x-[12px]">
            <input
              type="radio"
              id="scheduleLater"
              name="campaignTiming"
              value="scheduleLater"
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="scheduleLater" className="text-[14px] font-[400]">
              Schedule for later
            </label>
          </div>
        </div>

        {/* Date and Time Inputs */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="space-y-[8px]">
            <label className="block text-[14px] font-[400] text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="2025-06-23"
            />
          </div>
          <div className="space-y-[8px]">
            <label className="block text-[14px] font-[400] text-gray-700">
              Time
            </label>
            <input
              type="time"
              className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="09:00"
            />
          </div>
        </div>

        {/* Follow up settings */}
        <div className="space-y-[12px]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-[400]">Follow up with users who didn't view your message</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-[44px] h-[24px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="space-y-[8px]">
            <label className="block text-[14px] font-[400] text-gray-500">
              When should?
            </label>
            <input
              type="text"
              placeholder="Thank you once again"
              className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[8px]">
              <label className="block text-[14px] font-[400] text-gray-700">
                Date
              </label>
              <input
                type="date"
                className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="2025-06-25"
              />
            </div>
            <div className="space-y-[8px]">
              <label className="block text-[14px] font-[400] text-gray-700">
                Time
              </label>
              <input
                type="time"
                className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="09:00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-[16px] pt-[32px]">
        <PrimaryButton fullWidth>
          Send Campaign
        </PrimaryButton>
        <TertiaryButton fullWidth onClick={() => handleStepChange && handleStepChange(2)}>
          Cancel
        </TertiaryButton>
      </div>
    </div>
  )
}

export default ConfirmAndSend