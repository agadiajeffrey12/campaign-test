'use client'
import StepChanger from "@/components/reuseables/StepChanger";
import { useState } from "react";

const StepChangerDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
          className="mb-8"
        />
      {/* </div> */}

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Current Step: {steps.find(s => s.id === currentStep)?.title}
        </h2>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            disabled={currentStep === steps.length}
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepChangerDemo;