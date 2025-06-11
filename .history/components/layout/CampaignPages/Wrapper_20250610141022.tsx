import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Mail } from "lucide-react"

// This is a wrapper component for the campaign pages
interface WrapperProps {
    children?: React.ReactNode;
    type?: 'default' | 'create' | 'edit' | 'view';
    viewType?: 'campaign' | 'template';
    state: 'has-data' | 'no-data' | 'loading';
    showTabs?: boolean;
    defaultTab?: string;
    onTabChange?: (value: string) => void;
}

const Wrapper = ({
    children,
    type = 'default',
    viewType = 'campaign',
    state = 'has-data',
    showTabs = true,
    defaultTab = 'campaigns',
    onTabChange
}: WrapperProps) => {

    let header: React.ReactNode = <DefaultHeader showTabs={showTabs} defaultTab={defaultTab} onTabChange={onTabChange} />

    switch (type) {
        case 'default':
            header = <DefaultHeader showTabs={showTabs} defaultTab={defaultTab} onTabChange={onTabChange} />
            break;
        case 'create':
            header = <CreateHeader viewtype={viewType} />
            break;
        // case 'edit':
        //     header = <DefaultHeader showTabs={showTabs} defaultTab={defaultTab} onTabChange={onTabChange} />
        //     break;
        // case 'view':
        //     header = <DefaultHeader showTabs={showTabs} defaultTab={defaultTab} onTabChange={onTabChange} />
        //     break;
        default:
            header = <DefaultHeader showTabs={showTabs} defaultTab={defaultTab} onTabChange={onTabChange} />
    }

    // If we're in default mode and showing tabs, wrap everything in tabs
    if (type === 'default' && showTabs) {
        return (
            <Tabs defaultValue={defaultTab} onValueChange={onTabChange} className="w-full">
                <div className="space-y-6">
                    {header}
                    <div className="mt-6">
                        {children}
                    </div>
                </div>
            </Tabs>
        )
    }

    // For other types, render normally
    return (
        <div className="space-y-6">
            {header}
            {children}
        </div>
    )
}

export default Wrapper

// Default Header Component
interface DefaultHeaderProps {
    showTabs?: boolean;
    defaultTab?: string;
    onTabChange?: (value: string) => void;
}

const DefaultHeader = ({ showTabs = true, defaultTab = 'campaigns', onTabChange }: DefaultHeaderProps) => {
    return (
        <div className='w-full flex justify-between items-start'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[24px] text-dark-blue font-[500]'>Campaigns</h2>
                <p className='text-secondary-text text-[14px]'>
                    Manage all your email campaigns here.
                </p>
            </div>
            
            {showTabs && (
                <TabsList className="grid grid-cols-2 w-auto">
                    <TabsTrigger value="campaigns" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Campaigns
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Templates
                    </TabsTrigger>
                </TabsList>
            )}
        </div>
    )
}

// Create Header Component
interface CreateHeaderProps {
    viewtype: 'campaign' | 'template';
}

const CreateHeader = ({ viewtype }: CreateHeaderProps) => {
    const cappedViewType = viewtype.charAt(0).toUpperCase() + viewtype.slice(1);
    
    return (
        <div className='w-full flex justify-between items-start'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[24px] text-dark-blue font-[500]'>Create {cappedViewType}</h2>
                <p className='text-secondary-text text-[14px]'>
                    {viewtype === 'campaign' 
                        ? 'Set up a campaign to promote your property or message your tenants.' 
                        : 'Save time by creating reusable email formats.'
                    }
                </p>
            </div>
            
          
        </div>
    )
}