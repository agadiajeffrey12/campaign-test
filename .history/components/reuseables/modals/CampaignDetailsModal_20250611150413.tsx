import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ReportData } from '@/components/layout/CampaignPages/Campaigns/CampaignsTab'

interface CampaignDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onViewMessage: () => void
  campaign: ReportData | null
}

const CampaignDetailModal = ({ 
  isOpen, 
  onClose, 
  onViewMessage, 
  campaign 
}: CampaignDetailModalProps) => {
  if (!campaign) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="fixed top-0">
    <DialogContent 
      className="relative right-0 top-[90px] h-full w-[400px] max-w-none p-0 m-0 translate-x-0 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 transition-transform duration-300 ease-in-out border-l shadow-2xl rounded-none overflow-hidden"
      onOpenAutoFocus={(e: React.SyntheticEvent) => e.preventDefault()}
    >
      <DialogTitle className="sr-only">Campaign Detail</DialogTitle>
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 h-auto"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">Campaign detail</h2>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6">
        {/* Campaign Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
            {campaign.campaignName}
          </div>
        </div>

        {/* Email Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email sent</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
            {campaign.emailsSent.toLocaleString()}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email delivered</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
            Regular
            </div>
          </div>
        </div>

        {/* Rates Row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Open rate</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
            {campaign.openRate}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Click rate</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
            {campaign.clickRate}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Bounce rate</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
            {campaign.bounceRate}
            </div>
          </div>
        </div>

        {/* Sent Date */}
        <div>
          <label className="text-sm font-medium text-gray-700">Sent</label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
            {campaign.lastSent}
          </div>
        </div>

        {/* View Message Button */}
        <div className="pt-4">
          <Button
            onClick={onViewMessage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            View message
          </Button>
        </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
        <Button 
          onClick={onClose}
          variant="outline" 
          className="w-full bg-gray-900 text-white hover:bg-gray-800 border-gray-900"
        >
          Cancel
        </Button>
        </div>
      </div>
    </DialogContent>
    </Dialog>
  )
}

export default CampaignDetailModal