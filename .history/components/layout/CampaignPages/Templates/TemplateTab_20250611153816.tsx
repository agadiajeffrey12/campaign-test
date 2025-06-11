import { Input } from '@/components/reuseables/inputs'
import React from 'react'
import { Search } from 'lucide-react'
import { PrimaryButton } from '@/components/reuseables/buttons'

const TemplateTab = () => {
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[20px] font-[400] text-dark-blue'>Your templates</h2>
                <p className='text-[14px] text-secondary-text'>View and manage the templates you’ve created.</p>
            </div>
            <div className='flex space-x-3'>
                <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text' size={15}/>
                    <Input placeholder='Search for...' size='md'/>
                </div>
                <PrimaryButton size='small' isLink href='/dashboard/campaign?screen=create&type=template'>
                    Create template
                </PrimaryButton>
            </div>
        </div>
    </div>
  )
}

export default TemplateTab