import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import CampaignsDataTable from '@/components/reuseables/tables/campaignDataTable' 
import { EmptyState } from '@/components/reuseables/EmptyState'
import ReportsDataTable from '@/components/reuseables/tables/ReportsDataTable'



    export interface ReportData {
  id: string
  campaignName: string
  emailsSent: number
  lastSent: string
  openRate: string
  clickRate: string
  bounceRate: string
}
const CampaignsTab = () => {
    const [activeTab, setActiveTab] = useState('Your campaigns')
    const [reports, setReports] = useState<ReportData[]>(
        [
  {
    id: '1',
    campaignName: 'Thank you mail\nTEDx Abuja 2025',
    emailsSent: 200,
    lastSent: '23 Apr, 2025',
    openRate: '45%',
    clickRate: '20%',
    bounceRate: '2%'
  },
  {
    id: '2',
    campaignName: 'Review email\nTEDx Abuja 2025',
    emailsSent: 500,
    lastSent: '25 Apr, 2025',
    openRate: '29%',
    clickRate: '50%',
    bounceRate: '4%'
  },
  {
    id: '3',
    campaignName: 'Thank you mail\nTEDx Abuja 2025',
    emailsSent: 350,
    lastSent: '23 Apr, 2025',
    openRate: '20%',
    clickRate: '100%',
    bounceRate: '0.5%'
  },
  {
    id: '4',
    campaignName: 'Thank you mail\nTEDx Abuja 2025',
    emailsSent: 203,
    lastSent: '25 Apr, 2025',
    openRate: '24%',
    clickRate: '16%',
    bounceRate: '10%'
  }
]
    ) // Assuming you will fetch reports data
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
                               <EmptyState title='No reports to show yet' description='Reports will appear here once you a campaign goes live'genericImage='/board.png' />
                            ) : (
                                <ReportsDataTable data={reports}/>
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
