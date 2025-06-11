import { Input } from '@/components/reuseables/inputs'
import React from 'react'
import { Search,Plus } from 'lucide-react'
import { MiniAddButton, PrimaryButton } from '@/components/reuseables/buttons'
import { TemplateCarditem } from './TemplateCardItem'

const TemplateTab = () => {
  return (
    <div className='space-y-4 '>
        <div className='flex w-full flex-col md:flex-row md:items-center justify-between'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[20px] font-[400] text-dark-blue'>Your templates</h2>
                <p className='text-[14px] text-secondary-text'>View and manage the templates you’ve created.</p>
            </div>
            <div className='flex space-x-3 mt-3 md:mt-0'>
                <div className='relative'>
                    <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-secondary-text' size={15}/>
                    <Input placeholder='Search for...' size='lg'/>
                </div>
                <PrimaryButton size='small' className='hidden md:flex' height={48} isLink href='/dashboard/campaign?screen=create&type=template'>
                    Create template
                </PrimaryButton>
                <MiniAddButton className='md:hidden' isLink href='/dashboard/campaign?screen=create&type=template'>
                </MiniAddButton>
            </div>
        </div>
        <TemplateCarditem
  title="Thank you message"
  content="Hi [First Name],Thank you for renting my property, It was a pleasure having you with us, and we truly appreciate your ..."
  timestamp="2025-04-12T14:35:00Z"
  menuItems={[
    { label: 'Send Now', onClick: () => console.log('Send Now clicked') },
    { label: 'Archive', onClick() {
        console.log('Archive clicked');
    }, destructive: true }
  ]}
/>







    </div>
  )
}

export default TemplateTab