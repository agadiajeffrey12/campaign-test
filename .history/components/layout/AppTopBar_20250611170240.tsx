'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronDown
} from 'lucide-react'
import Image from 'next/image'

const AppTopBar = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        
        {/* Left section - Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full sm:block hidden">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search for..."
              className="pl-10 pr-4 h-10  bg-slate-50 border-slate-200 focus:bg-white"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <Image src={'/straqa.png'} height={100} width={100} alt=''/>
        </div>

        {/* Right section - Notifications & Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative h-10 w-10 rounded-full hover:bg-slate-100"
              >
                <Bell className="h-5 w-5 text-slate-600" />
                {/* Notification badge */}
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">3 new</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="space-y-1">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium text-sm">New booking received</div>
                  <div className="text-xs text-slate-500">Property: Ocean View Villa</div>
                  <div className="text-xs text-slate-400 mt-1">2 minutes ago</div>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium text-sm">Campaign completed</div>
                  <div className="text-xs text-slate-500">Summer Special campaign has ended</div>
                  <div className="text-xs text-slate-400 mt-1">1 hour ago</div>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium text-sm">Guest message</div>
                  <div className="text-xs text-slate-500">John Smith sent you a message</div>
                  <div className="text-xs text-slate-400 mt-1">3 hours ago</div>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 h-10 px-3 rounded-lg hover:bg-slate-100"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
               
                {/* <ChevronDown className="h-4 w-4 text-slate-400" /> */}
              </Button>
            </DropdownMenuTrigger>
           
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default AppTopBar