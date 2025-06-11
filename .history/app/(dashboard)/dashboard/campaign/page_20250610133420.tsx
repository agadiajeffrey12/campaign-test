'use client'

import Wrapper from '@/components/layout/CampaignPages/Wrapper'
import { TabsContent } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Users, MoreHorizontal, Plus } from "lucide-react"
import React, { useState } from 'react'
import { Button } from '@/components/reuseables/buttons'

const Campaign = () => {
    const [activeTab, setActiveTab] = useState('campaigns')

    // Sample data - replace with your actual data
    const campaigns = [
        // {
        //     id: 1,
        //     title: "Summer Special Promotion",
        //     status: "active",
        //     sentDate: "2024-06-08",
        //     recipients: 150,
        //     openRate: "24%"
        // },
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
        {
            id: 1,
            title: "Welcome Email Template",
            description: "Standard welcome message for new tenants",
            lastModified: "2024-06-05"
        },
        {
            id: 2,
            title: "Maintenance Notice",
            description: "Template for scheduled maintenance notifications",
            lastModified: "2024-06-03"
        }
    ]

    return (
        <Wrapper 
            type='default' 
            viewType='campaign' 
            state='has-data'
            showTabs={true}
            defaultTab='campaigns'
            onTabChange={setActiveTab}
        >
            {/* Campaigns Tab Content */}
            <TabsContent value="campaigns" className="space-y-4">
                {campaigns.length > 0 ? (
                    <div className="grid gap-4">
                        {campaigns.map((campaign) => (
                            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                    <div className="space-y-2">
                                        <CardTitle className="text-lg">{campaign.title}</CardTitle>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {campaign.recipients} recipients
                                            </div>
                                            {campaign.sentDate && (
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {campaign.sentDate}
                                                </div>
                                            )}
                                            {campaign.openRate && (
                                                <div className="flex items-center gap-1">
                                                    <Mail className="h-4 w-4" />
                                                    {campaign.openRate} open rate
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge 
                                            variant={campaign.status === 'active' ? 'default' : 'secondary'}
                                        >
                                            {campaign.status}
                                        </Badge>
                                        <Button >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
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
                        {templates.map((template) => (
                            <Card key={template.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                    <div className="space-y-2">
                                        <CardTitle className="text-lg">{template.title}</CardTitle>
                                        <CardDescription>{template.description}</CardDescription>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            Last modified: {template.lastModified}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button >
                                            Edit
                                        </Button>
                                        <Button variant='primary'>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        title="No templates yet"
                        description="Save time by creating reusable email formats. Design once and use for multiple campaigns."
                        actionText="Create template"
                        actionIcon={<Plus className="h-4 w-4" />}
                    />
                )}
            </TabsContent>
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

const EmptyState = ({ title, description, actionText, actionIcon }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mx-auto max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{description}</p>
                <Button variant="primary" className="flex items-center gap-2">
                    {actionIcon}
                    {actionText}
                </Button>
            </div>
        </div>
    )
}

export default Campaign