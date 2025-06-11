import React from 'react';

interface Step {
  id: number;
  title: string;
}

interface StepChangerProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  allowClickableSteps?: boolean;
  className?: string;
}

const StepChanger: React.FC<StepChangerProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickableSteps = false,
  className = ''
}) => {
  const handleStepClick = (stepId: number) => {
    if (allowClickableSteps && onStepClick) {
      onStepClick(stepId);
    }
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isClickable = allowClickableSteps && onStepClick;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div 
                className={`flex  items-center gap-2 ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
                onClick={() => isClickable && handleStepClick(step.id)}
              >
                {/* Step Circle */}
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-2 transition-all duration-200
                  ${status === 'active' 
                    ? 'bg-gray-900 text-white' 
                    : status === 'completed'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-600'
                  }
                  ${isClickable ? 'hover:scale-105' : ''}
                `}>
                  {step.id}
                </div>
                
                {/* Step Title */}
                <span className={`
                  text-sm font-medium text-center transition-colors duration-200
                  ${status === 'active' 
                    ? 'text-gray-900' 
                    : status === 'completed'
                    ? 'text-gray-900'
                    : 'text-gray-400'
                  }
                `}>
                  {step.title}
                </span>
              </div>
              
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="flex items-center px-4 sm:px-8">
                  <svg 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      step.id < currentStep ? 'text-gray-400' : 'text-gray-300'
                    }`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepChanger;
