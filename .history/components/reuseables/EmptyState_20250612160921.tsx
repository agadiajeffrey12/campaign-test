'use client'
import React from 'react';
import Image from 'next/image';
import { PrimaryButton } from '@/components/reuseables/buttons';

interface EmptyStateProps {
    title: string;
    description: string;
    actionText?: string;
    actionIcon?: React.ReactNode;
    genericImage?: string;
}

export const EmptyState = ({ title, description, actionText, actionIcon, genericImage }: EmptyStateProps) => {
    const type = title.includes('campaigns') ? 'campaign' : title.includes('template') ? 'template' : 'generic';
    const createAction = type === 'campaign' ? `/dashboard/campaign?screen=create&&type=${type}` : `/dashboard/campaign?screen=create&&type=${type}`;
    
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
            <Image 
                src={type === 'campaign' ? '/jet.png' : type === 'template' ? '/Layout.png' : genericImage as string} 
                width={150} 
                height={150} 
                alt={type} 
            />
            <div className="mx-auto max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{description}</p>
                {actionText && (
                    <PrimaryButton isLink href={createAction} className='flex items-center gap-2'>
                        {actionIcon}
                        {actionText}
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
};