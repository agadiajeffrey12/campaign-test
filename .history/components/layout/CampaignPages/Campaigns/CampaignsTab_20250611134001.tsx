import React,{useState} from 'react'

const CampaignsTab = () => {
    const [activeTab, setActiveTab] = useState('Your campaigns')
    const tabs = [
        'Your campaigns',
        'Reports'
    ]

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
  
    }
  return (
    <div className='w-full mt-6'>
        <div className='flex w-full border-b-2 border-slate-300 px-2'>
            {tabs.map((tab, index) => (
                <div key={index} onClick={() => handleTabClick(tab)} className='py-3 px-6 text-[14px] font-[500] text-secondary-text cursor-pointer hover:text-primary-blue transition-colors'>
                    {tab}
                </div>
            ))}
        </div>
    </div>
  )
}

export default CampaignsTab