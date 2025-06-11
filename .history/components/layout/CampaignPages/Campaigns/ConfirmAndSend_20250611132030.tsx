import React, { useState, useRef, useEffect } from 'react'
import { BasicInformationFormProps } from './BasicInformationForm'
import { Input, Select } from '@/components/reuseables/inputs'
import { PrimaryButton, TertiaryButton } from '@/components/reuseables/buttons'

const ConfirmAndSend = (
        { formData, handleInputChange, errors, handleSelectChange, handleStepChange }: BasicInformationFormProps
) => {
  const [campaignTiming, setCampaignTiming] = useState('sendNow');
  const [scheduleDate, setScheduleDate] = useState('2025-06-23');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [followUpEnabled, setFollowUpEnabled] = useState(false);
  const [followUpSubject, setFollowUpSubject] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2025-06-25');
  const [followUpTime, setFollowUpTime] = useState('09:00');
  const [emailBody, setEmailBody] = useState(formData?.message || '');
  const editorRef = useRef(null);

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

  // Initialize editor content only once
  useEffect(() => {
    if (formData?.message && editorRef.current && editorRef.current.innerHTML !== formData.message) {
      editorRef.current.innerHTML = formData.message;
      setEmailBody(formData.message);
    }
  }, [formData?.message]);

  const handleTextFormat = (command, value = null) => {
    if (typeof document !== 'undefined') {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      // Update the content after formatting
      const content = editorRef.current?.innerHTML || '';
      setEmailBody(content);
      if (handleInputChange) {
        handleInputChange('message')({ target: { value: content } });
      }
    }
  };

  const handleEmailBodyChange = (e) => {
    const value = e.target.innerHTML || '';
    setEmailBody(value);
    if (handleInputChange) {
      handleInputChange('message')({ target: { value } });
    }
  };

  const handleCampaignTimingChange = (value) => {
    setCampaignTiming(value);
    if (handleInputChange) {
      const timeData = value === 'sendNow' ? {
        date: new Date(),
        time: new Date().toTimeString().slice(0, 5)
      } : {
        date: new Date(scheduleDate),
        time: scheduleTime
      };
      handleInputChange('time')({ target: { value: timeData } });
    }
  };

  const handleScheduleDateChange = (date) => {
    setScheduleDate(date);
    if (campaignTiming === 'scheduleLater' && handleInputChange) {
      handleInputChange('time')({ target: { value: { date: new Date(date), time: scheduleTime } } });
    }
  };

  const handleScheduleTimeChange = (time) => {
    setScheduleTime(time);
    if (campaignTiming === 'scheduleLater' && handleInputChange) {
      handleInputChange('time')({ target: { value: { date: new Date(scheduleDate), time } } });
    }
  };

  const handleFollowUpToggle = () => {
    const newValue = !followUpEnabled;
    setFollowUpEnabled(newValue);
    if (handleInputChange) {
      handleInputChange('canFollowUpUsers')({ target: { value: newValue } });
    }
  };

  const handleFollowUpSubjectChange = (e) => {
    const value = e.target.value;
    setFollowUpSubject(value);
    if (handleInputChange) {
      handleInputChange('newSubject')({ target: { value } });
    }
  };

  const getPlainTextLength = (html) => {
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent?.length || 0;
    }
    // Fallback for SSR
    return html.replace(/<[^>]*>/g, '').length;
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

        {/* Rich Text Editor */}
        <div className="space-y-[8px]">
          <label className="block text-[14px] font-[400] text-gray-700">
            Message Content
          </label>
          
          {/* Enhanced Formatting Toolbar */}
          <div className="flex items-center space-x-[4px] p-[12px] border border-gray-300 rounded-t-[8px] bg-gray-50 flex-wrap gap-[4px]">
            <button
              type="button"
              onClick={() => handleTextFormat('bold')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[14px] font-bold border border-gray-300 bg-white"
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('italic')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[14px] italic border border-gray-300 bg-white"
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('underline')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[14px] underline border border-gray-300 bg-white"
              title="Underline"
            >
              U
            </button>
            
            <div className="w-[1px] h-[20px] bg-gray-300 mx-[4px]"></div>
            
            <button
              type="button"
              onClick={() => handleTextFormat('justifyLeft')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[12px] border border-gray-300 bg-white"
              title="Align Left"
            >
              ⬅
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('justifyCenter')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[12px] border border-gray-300 bg-white"
              title="Center"
            >
              ↔
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('justifyRight')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[12px] border border-gray-300 bg-white"
              title="Align Right"
            >
              ➡
            </button>
            
            <div className="w-[1px] h-[20px] bg-gray-300 mx-[4px]"></div>
            
            <button
              type="button"
              onClick={() => handleTextFormat('insertUnorderedList')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[14px] border border-gray-300 bg-white"
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('insertOrderedList')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[14px] border border-gray-300 bg-white"
              title="Numbered List"
            >
              1.
            </button>
            
            <div className="w-[1px] h-[20px] bg-gray-300 mx-[4px]"></div>
            
            <button
              type="button"
              onClick={() => handleTextFormat('formatBlock', 'h1')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[12px] font-bold border border-gray-300 bg-white"
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('formatBlock', 'h2')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[12px] font-bold border border-gray-300 bg-white"
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => handleTextFormat('formatBlock', 'p')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[12px] border border-gray-300 bg-white"
              title="Paragraph"
            >
              P
            </button>
            
            <div className="w-[1px] h-[20px] bg-gray-300 mx-[4px]"></div>
            
            <button
              type="button"
              onClick={() => handleTextFormat('removeFormat')}
              className="px-[8px] py-[4px] hover:bg-gray-200 rounded text-[12px] border border-gray-300 bg-white"
              title="Clear Formatting"
            >
              ✕
            </button>
          </div>

          {/* Text Editor */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            className="w-full min-h-[200px] p-[16px] border border-gray-300 border-t-0 rounded-b-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            style={{ 
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'inherit'
            }}
            onInput={handleEmailBodyChange}
            onBlur={handleEmailBodyChange}
            placeholder="Type your message here..."
          />
          
          {/* Character Count */}
          <div className="text-right text-[12px] text-gray-500">
            {getPlainTextLength(emailBody)} characters
          </div>
          
          {errors?.message && (
            <div className="text-red-500 text-[12px]">{errors.message}</div>
          )}
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
              checked={campaignTiming === 'sendNow'}
              onChange={(e) => handleCampaignTimingChange(e.target.value)}
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
              checked={campaignTiming === 'scheduleLater'}
              onChange={(e) => handleCampaignTimingChange(e.target.value)}
              className="w-[16px] h-[16px]"
            />
            <label htmlFor="scheduleLater" className="text-[14px] font-[400]">
              Schedule for later
            </label>
          </div>
        </div>

        {/* Date and Time Inputs - Only show when scheduling for later */}
        {campaignTiming === 'scheduleLater' && (
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[8px]">
              <label className="block text-[14px] font-[400] text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => handleScheduleDateChange(e.target.value)}
                className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-[8px]">
              <label className="block text-[14px] font-[400] text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => handleScheduleTimeChange(e.target.value)}
                className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Follow up settings */}
        <div className="space-y-[12px]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-[400]">Follow up with users who didn't view your message</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={followUpEnabled}
                onChange={handleFollowUpToggle}
              />
              <div className="w-[44px] h-[24px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {followUpEnabled && (
            <>
              <div className="space-y-[8px]">
                <label className="block text-[14px] font-[400] text-gray-700">
                  Follow-up subject
                </label>
                <input
                  type="text"
                  placeholder="Thank you once again"
                  value={followUpSubject}
                  onChange={handleFollowUpSubjectChange}
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
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className="block text-[14px] font-[400] text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    value={followUpTime}
                    onChange={(e) => setFollowUpTime(e.target.value)}
                    className="w-full p-[12px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}
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