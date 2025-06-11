import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import CampaignsDataTable from '@/components/reuseables/tables/campaignDataTable' 

const CampaignsTab = () => {
    const [activeTab, setActiveTab] = useState('Your campaigns')
    const tabs = [
        'Your campaigns',
        'Reports'
    ]

    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div className='w-full mt-6'>
            <div className='flex w-full border-b-2 border-slate-300 px-2'>
                {tabs.map((tab, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleTabClick(tab)} 
                        className={cn(
                            'py-3 px-6 text-[14px] font-[500] text-secondary-text cursor-pointer hover:text-primary-blue transition-colors',
                            activeTab === tab 
                                ? 'border-b-2 border-dark-blue text-primary-blue' 
                                : 'border-b-2 border-transparent text-secondary-text'
                        )}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className='mt-6'>
                {activeTab === 'Your campaigns' && (
                    <CampaignsDataTable />
                )}
                {activeTab === 'Reports' && (
                    <div className='text-center text-secondary-text mt-4'>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-dark-blue text-[20px] font-[400]">Reports</h2>
                            <p className="text-secondary-text text-[14px]">
                                View all details and progress for your campaign.
                            </p>
                            </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CampaignsTab