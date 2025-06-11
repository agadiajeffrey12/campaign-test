'use client'

import Wrapper from '@/components/layout/CampaignPages/Wrapper'
import { TabsContent } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Users, MoreHorizontal, Plus } from "lucide-react"
import React, { useState } from 'react'
import { Button, PrimaryButton } from '@/components/reuseables/buttons'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
// import StepChangerDemo from '@/components/layout/CampaignPages/Campaigns/CreateCampaign'
import CreateCampaignPage from '@/components/layout/CampaignPages/Campaigns/CreateCampaign'
import CampaignsTab from '@/components/layout/CampaignPages/Campaigns/CampaignsTab'

const Campaign = () => {
    const [activeTab, setActiveTab] = useState('campaigns')
    const searchParams = useSearchParams()
    const screen = searchParams.get('screen') || 'default'
    const type = searchParams.get('type') || 'campaign'

    // Sample data - replace with your actual data
    const campaigns = [
        {
            id: 1,
            title: "Summer Special Promotion",
            status: "active",
            sentDate: "2024-06-08",
            recipients: 150,
            openRate: "24%"
        },
        // {
        //     id: 2,
        //     title: "Property Update Newsletter",
        //     status: "draft",
        //     sentDate: null,
        //     recipients: 0,
        //     openRate: null
        // }
    ]

    const templates = [
        // {
        //     id: 1,
        //     title: "Welcome Email Template",
        //     description: "Standard welcome message for new tenants",
        //     lastModified: "2024-06-05"
        // },
        // {
        //     id: 2,
        //     title: "Maintenance Notice",
        //     description: "Template for scheduled maintenance notifications",
        //     lastModified: "2024-06-03"
        // }
    ]

    return (
        <Wrapper 
            type={screen as 'default' | 'create' | 'edit' | 'view'} 
            viewType={type as 'campaign' | 'template'} 
            state='has-data'
            showTabs={true}
            defaultTab='campaigns'
            onTabChange={setActiveTab}
        >
            {
                screen === 'default' && (
                    <>
                    {/* Campaigns Tab Content */}
            <TabsContent value="campaigns" className="space-y-4">
                {campaigns.length > 0 ? (
                    <CampaignsTab/>
                ) : (
                    <EmptyState 
                        title="No campaigns yet"
                        description="Use campaigns to promote your property or stay in touch with your tenants. Send updates, reminders, or special offers, all from one place."
                        actionText="Create campaign"
                        actionIcon={<Plus className="h-4 w-4" />}
                    />
                )}
            </TabsContent>

            {/* Templates Tab Content */}
            <TabsContent value="templates" className="space-y-4">
                {templates.length > 0 ? (
                    <div className="grid gap-4">
                     
                    </div>
                ) : (
                    <EmptyState 
                        title="You haven’t created any templates"
                        description="Email templates help you save time and stay consistent. Design once, reuse anytime you’re sending messages."
                        actionText="Create template"
                        actionIcon={<Plus className="h-4 w-4" />}
                    />
                )}
            </TabsContent>
                    </>
                )

               
            }
            {
                 (screen === 'create' && type === 'campaign')  && (
                    <>
                    <CreateCampaignPage/>
                    </>
                )
            }
        </Wrapper>
    )
}

// Empty State Component
interface EmptyStateProps {
    title: string;
    description: string;
    actionText: string;
    actionIcon?: React.ReactNode;
}

export const EmptyState = ({ title, description, actionText, actionIcon }: EmptyStateProps) => {
    const type = title.includes('campaigns') ? 'campaign' : 'template';
    const createAction = type === 'campaign' ? `/dashboard/campaign?screen=create&&type=${type}` : `/dashboard/campaign?screen=create&&type=${type}`;
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
                <Image src={type ==='campaign' ? '/jet.png' : '/Layout.png'} width={150} height={150} alt='jet'/>
            <div className="mx-auto max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{description}</p>
                <PrimaryButton isLink href={createAction} className='flex items-center gap-2'>
                    {actionIcon}
                    {actionText}
                </PrimaryButton>
            </div>
        </div>
    )
}

export default Campaign