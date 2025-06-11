import React from 'react'

const CampaignsTab = () => {
    const tabs = [
        'Your campaigns',
        'Reports'
    ]
  return (
    <div className='w-full mt-6'>
        <div className='flex w-full border-b-2 border-slate-300 px-2'>
            {tabs.map((tab, index) => (
                <div key={index} className='py-3 px-6 text-[14px] font-[500] text-secondary-text cursor-pointer hover:text-primary-blue transition-colors'>
                    {tab}
                </div>
            ))}
        </div>
    </div>
  )
}

export default CampaignsTab