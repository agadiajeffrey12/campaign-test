import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronDown, 
  Search, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal 
} from "lucide-react"
import { PrimaryButton } from '@/components/reuseables/buttons'
import { cn } from '@/lib/utils'


interface Campaign {
  id: string
  name: string
  status: 'Sent' | 'Scheduled'
  date: string
  recipients: number
  openRate: string
  clickRate: string
}

const campaignsData: Campaign[] = [
  {
    id: '1',
    name: 'Thank you mail\nTEDx Abuja 2025',
    status: 'Sent',
    date: '23 Apr, 2025',
    recipients: 245,
    openRate: '45%',
    clickRate: '--'
  },
  {
    id: '2',
    name: 'Review email\nTEDx Abuja 2025',
    status: 'Scheduled',
    date: '25 Apr, 2025',
    recipients: 592,
    openRate: '--',
    clickRate: '--'
  },
  {
    id: '3',
    name: 'Thank you mail\nTEDx Abuja 2025',
    status: 'Sent',
    date: '23 Apr, 2025',
    recipients: 100,
    openRate: '20%',
    clickRate: '100%'
  },
  {
    id: '4',
    name: 'Thank you mail\nTEDx Abuja 2025',
    status: 'Scheduled',
    date: '25 Apr, 2025',
    recipients: 200,
    openRate: '--',
    clickRate: '--'
  }
]

const CampaignsDataTable = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage)

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const StatusBadge = ({ status }: { status: Campaign['status'] }) => {
    return (
      <Badge 
        variant={status === 'Sent' ? 'default' : 'secondary'}
        className={cn(
          'text-xs font-medium px-2 py-1',
          status === 'Sent' 
            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
            : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
        )}
      >
        {status}
      </Badge>
    )
  }

  const ActionDropdown = ({ campaign }: { campaign: Campaign }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {campaign.status === 'Sent' ? (
            <DropdownMenuItem className="text-blue-600 cursor-pointer">
              View report
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="text-blue-600 cursor-pointer">
              Edit
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-dark-blue text-[20px] font-[400]">Your campaigns</h2>
          <p className="text-secondary-text text-[14px]">
            View all details and progress for your campaign.
          </p>
        </div>
        <PrimaryButton 
          size="small" 
          isLink 
          href="/dashboard/campaign?screen=create&type=campaign" 
          className="mt-4"
        >
          Create campaign
        </PrimaryButton>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 text-sm">
                {statusFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => handleStatusFilterChange('All')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilterChange('Sent')}>
                Sent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilterChange('Scheduled')}>
                Scheduled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-8 h-9 w-64 text-sm"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50/50">
              <TableHead className="text-xs text-left font-medium text-gray-700 py-3">
                Campaign Name
              </TableHead>
              <TableHead className="text-xs text-left font-medium text-gray-700">
                Status
              </TableHead>
              <TableHead className="text-xs text-left font-medium text-gray-700">
                Date
              </TableHead>
              <TableHead className="text-xs text-left font-medium text-gray-700">
                No. of recipients
              </TableHead>
              <TableHead className="text-xs text-left font-medium text-gray-700">
                Open rate
              </TableHead>
              <TableHead className="text-xs text-left font-medium text-gray-700">
                Click rate
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCampaigns.length > 0 ? (
              paginatedCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="border-b hover:bg-gray-50/50">
                  <TableCell className="py-4">
                    <div className="whitespace-pre-line text-sm font-medium text-gray-900">
                      {campaign.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={campaign.status} />
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {campaign.date}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {campaign.recipients.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {campaign.openRate}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {campaign.clickRate}
                  </TableCell>
                  <TableCell>
                    <ActionDropdown campaign={campaign} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="h-8 w-8 p-0"
            >
              {page}
            </Button>
          ))}
          {totalPages > 10 && (
            <>
              <span className="text-gray-500">...</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default CampaignsDataTable