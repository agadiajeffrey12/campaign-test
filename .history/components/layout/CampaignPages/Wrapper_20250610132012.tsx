import React from 'react'

// This is a wrapper component for the campaign pages
interface WrapperProps {
    children?: React.ReactNode;
    type?: 'default'|'create' | 'edit' | 'view';
    viewType?:'campaign' | 'template';
    state: 'has-data' | 'no-data' | 'loading';
}

const Wrapper = (
    { children, type = 'create', viewType = 'campaign', state = 'has-data' }: WrapperProps
) => {

    let header: React.ReactNode = <DefaultHeader />

    switch (type) {
        case 'default':
            header = <DefaultHeader />
            break;
        case 'create':
            header = <CreateHeader viewtype={viewType} />
            break;
        // case 'edit':
        //     header = <DefaultHeader />
        //     break;
        // case 'view':
        //     header = <DefaultHeader />
        //     break;
        default:
            header = <DefaultHeader />
    }
  return (
    <div className={``}>
        
      {children}
    </div>
  )
}

export default Wrapper

const DefaultHeader = () => {
    return(
        <div className='w-full flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[24px] text-dark-blue font-[126]'>Campaigns</h2>
                <p className='text-secondary-text text-[14px]'>Manage all your email campaigns here.</p>
            </div>
        </div>
    )
}

// Create Header

interface CreateHeaderProps {
    viewtype: 'campaign' | 'template';

}
const CreateHeader = (
    { viewtype,}: CreateHeaderProps
) => {
    const firstLetter = viewtype.charAt(0).toUpperCase();
    const restLetters = viewtype.slice(1);
    const cappedViewType = firstLetter + restLetters;
    return(
        <div className='w-full flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[24px] text-dark-blue font-[126]'>Create {cappedViewType}</h2>
                <p className='text-secondary-text text-[14px]'>{viewtype === 'campaign' ? 'Set up a campaign to promote your property or message your tenants.': 'Save time by creating reusable email formats.'}</p>
            </div>
        </div>
    )
}