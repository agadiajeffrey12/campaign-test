import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from '@/lib/utils'
import { ReportData } from '@/components/layout/CampaignPages/Campaigns/CampaignsTab'
import { TertiaryButton } from '../buttons'







type SortField = keyof ReportData
type SortDirection = 'asc' | 'desc'

const ReportsDataTable = (
    {data}:{data: ReportData[]}
) => {
  const [reports, setReports] = useState<ReportData[]>(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const itemsPerPage = 10

  // Sorting function
  const handleSort = (field: SortField) => {
    let direction: SortDirection = 'asc'
    
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc'
    }
    
    setSortField(field)
    setSortDirection(direction)
    
    const sortedData = [...reports].sort((a, b) => {
      let aValue = a[field]
      let bValue = b[field]
      
      // Handle percentage values
      if (typeof aValue === 'string' && aValue.includes('%')) {
        aValue = parseFloat(aValue.replace('%', '')) as any
        bValue = parseFloat((bValue as string).replace('%', '')) as any
      }
      
      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      // Handle string values
      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()
      
      if (direction === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0
      }
    })
    
    setReports(sortedData)
  }

  // Pagination
  const totalPages = Math.ceil(reports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReports = reports.slice(startIndex, startIndex + itemsPerPage)

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => {
    const isActive = sortField === field
    
    return (
      <TableHead 
        className="text-left font-medium text-gray-700 py-3 cursor-pointer hover:bg-gray-50 select-none"
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-2">
          {children}
          <div className="flex flex-col">
            <ChevronUp 
              className={cn(
                "h-3 w-3 -mb-1",
                isActive && sortDirection === 'asc' ? "text-blue-600" : "text-gray-400"
              )} 
            />
            <ChevronDown 
              className={cn(
                "h-3 w-3",
                isActive && sortDirection === 'desc' ? "text-blue-600" : "text-gray-400"
              )} 
            />
          </div>
        </div>
      </TableHead>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Data Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50/50">
              <SortableHeader field="campaignName">
                Campaign Name
              </SortableHeader>
              <SortableHeader field="emailsSent">
                Email sent
              </SortableHeader>
              <SortableHeader field="lastSent">
                Last sent
              </SortableHeader>
              <SortableHeader field="openRate">
                Open rate
              </SortableHeader>
              <SortableHeader field="clickRate">
                Click rate
              </SortableHeader>
              <SortableHeader field="bounceRate">
                Bounce rate
              </SortableHeader>
              <TableHead className="w-[80px] text-xs text-center font-medium text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.length > 0 ? (
              paginatedReports.map((report) => (
                <TableRow key={report.id} className="border-b hover:bg-gray-50/50">
                  <TableCell className="py-4">
                    <div className="whitespace-pre-line text-xs font-medium text-gray-900">
                      {report.campaignName}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {report.emailsSent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {report.lastSent}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {report.openRate}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {report.clickRate}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {report.bounceRate}
                  </TableCell>
                  <TableCell className="text-center">
                    <TertiaryButton >
                        View Report
                    </TertiaryButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={cn(
                "h-8 w-8 p-0 text-sm",
                currentPage === page 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              )}
            >
              {page}
            </Button>
          ))}
          {totalPages > 3 && (
            <>
              <span className="text-gray-500 px-2">...</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(8)}
                className="h-8 w-8 p-0 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                8
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(9)}
                className="h-8 w-8 p-0 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                9
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(10)}
                className="h-8 w-8 p-0 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                10
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ReportsDataTable