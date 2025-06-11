import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import CampaignsDataTable from '@/components/reuseables/tables/campaignDataTable' 
import { EmptyState } from '@/app/(dashboard)/dashboard/campaign/page'

const CampaignsTab = () => {
    const [activeTab, setActiveTab] = useState('Your campaigns')
    const [reports, setReports] = useState([]) // Assuming you will fetch reports data
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
                    <div className=' text-secondary-text mt-4'>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-dark-blue text-[20px] font-[400]">Reports</h2>
                            <p className="text-secondary-text text-[14px]">
                               Know how your campaigns turned out
                            </p>
                            </div>

                        {
                            reports.length === 0 ? (
                               <EmptyState title='No reports to show yet' description=''/>
                            ) : (
                                <div className="mt-4">
                                    {/* Render your reports data here */}
                                    {reports.map((report, index) => (
                                        <div key={index} className="p-4 border rounded-lg mb-4">
                                            {/* <h3 className="text-dark-blue font-semibold">{report.title}</h3> */}
                                            {/* <p className="text-secondary-text">{report.description}</p> */}
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default CampaignsTab

// empty state
