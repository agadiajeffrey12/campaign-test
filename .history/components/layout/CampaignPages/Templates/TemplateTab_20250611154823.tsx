import { Input } from '@/components/reuseables/inputs'
import React from 'react'
import { Search } from 'lucide-react'
import { PrimaryButton } from '@/components/reuseables/buttons'
import { TemplateCarditem } from './TemplateCardItem'

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
                    <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-secondary-text' size={15}/>
                    <Input placeholder='Search for...' size='lg'/>
                </div>
                <PrimaryButton size='small' height={48} isLink href='/dashboard/campaign?screen=create&type=template'>
                    Create template
                </PrimaryButton>
            </div>
        </div>
        <TemplateCarditem
  title="Custom message"
  content="Content here..."
  timestamp="2025-04-12T14:35:00Z"
//   menuItems={[
//     { label: 'Send Now', onClick: handleSend },
//     { label: 'Archive', onClick: handleArchive, destructive: true }
//   ]}
/>
The component uses shadcn/ui components (Card, Button, DropdownMenu) and is fully styled with Tailwind CSS. It automatically handles timestamp formatting and provides a clean, professional look that matches your design reference.






    </div>
  )
}

export default TemplateTab