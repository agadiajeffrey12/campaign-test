import Wrapper from '@/components/layout/CampaignPages/Wrapper'
import React from 'react'

const Campaign = () => {
  return (
    <Wrapper type='default' viewType='campaign' state='has-data'>
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Campaign Page</h1>
            <p className="text-gray-600">This is the campaign page content.</p>
        </div>
    </Wrapper>
  )
}

export default Campaign