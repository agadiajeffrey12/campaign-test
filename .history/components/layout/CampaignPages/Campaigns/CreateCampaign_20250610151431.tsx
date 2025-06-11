'use client'
import StepChanger from "@/components/reuseables/StepChanger";
import { useState } from "react";
import BasicInformationForm from "./BasicInformationForm";

const CreateCampaignPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
   const [formData, setFormData] = useState({
    name: '',
    maillingList: '',
    sendersEmail: '',
    sendersName: '',
    nameOfEmail: '',
    template: '',
    message: '',
    time: {
        date: new Date(),
        time: ''
        },
    canFollowUpUsers: false,
    newSubject: ''  
  });
   const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

    const handleSelectChange = (field: string) => (value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const steps = [
    { id: 1, title: 'Basic information' },
    { id: 2, title: 'Email body' },
    { id: 3, title: 'Confirm and send' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
    

      {/* <div className="bg-white rounded-lg border border-gray-200 p-8"> */}
        <StepChanger
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          allowClickableSteps={true}
          className=""
        />
      {/* </div> */}

      <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center flex-col space-y-4">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {steps.find(s => s.id === currentStep)?.title}
        </h2>
        {
            currentStep === 1 && <BasicInformationForm formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} errors={errors}/>
        }
  
      </div>
    </div>
  );
};

export default CreateCampaignPage;