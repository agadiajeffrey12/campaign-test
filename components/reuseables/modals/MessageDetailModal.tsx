import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ReportData } from '@/components/layout/CampaignPages/Campaigns/CampaignsTab'
import { PrimaryButton } from '../buttons'

interface MessageDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
  campaign: ReportData | null
}

const MessageDetailModal = ({ 
  isOpen, 
  onClose, 
  onGoBack, 
  campaign 
}: MessageDetailModalProps) => {
  if (!campaign) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="fixed left-0 bottom-0 h-full w-[400px] max-w-none p-0 m-0 translate-x-0 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 transition-transform duration-300 ease-in-out border-l shadow-2xl rounded-none overflow-hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Message Details</DialogTitle>
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={onGoBack}
              className="p-1 h-auto"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">Message details</h2>
            {/* <div className="ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-blue-600 hover:text-blue-700"
              >
                Go back
              </Button>
            </div> */}
          </div>

              <div className='flex justify-end items-center px-4 py-2'>
                <button className='underline text-dark-blue' onClick={onClose}>Go back</button>
              </div>
          {/* Content */}
          <div className="flex-1 p-4 space-y-6">
            {/* Subject */}
            <div>
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                Thank you
              </div>
            </div>
            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-md text-sm space-y-3">
                <p>Hi [First Name],</p>
                <p>
                  Thank you for renting my property<br />
                  It was a pleasure having you with us, and we truly appreciate your presence.
                </p>
                <p>We hope you have a great time</p>
                <div className="space-y-1">
                  <p>Warm regards,</p>
                  <p>Slick Jones.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
         
            <PrimaryButton fullWidth className="mt-2" onClick={onClose}>
              Cancel
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MessageDetailModal