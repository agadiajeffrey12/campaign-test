'use client'

import Image from "next/image";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Home,
  Calendar,
  Users,
  Mail,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

// mobile and desktop sidebar componenent wrapping application

const AppSideBar = () => {
      const [isMobileOpen, setIsMobileOpen] = useState(false)
  const menuItems = [
    { icon: '/HouseLine.png', label: "Dashboard", href: "/dashboard" },
    { icon: '/BuildingOffice.png', label: "My properties", href: "/properties" },
    { icon: '/CalendarBlank.png', label: "Bookings", href: "/bookings" },
    { icon: '/UsersThree.png', label: "Guests", href: "/guests" },
    { icon: '/Envelope.png', label: "Campaigns", href: "/dashboard/campaign", active: true },
    { icon: '/ChartBarHorizontal.png', label: "Reports", href: "/reports" },
    { icon: '/Gear.png', label: "Settings", href: "/settings" },
    { icon: '/Question.png', label: "Support", href: "/support" },
  ];
  return (
    <>
        {/* Mobile backdrop */}
        {isMobileOpen && (
            <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
            />
        )}
        <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-light-grey transition-transform duration-300 ease-in-out",
        "lg:translate-x-0 lg:static lg:z-auto",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-slate-800">
            <div className="flex items-center justify-center w-full">
            
                <Image
                    src="/staqa.png"
                    alt="Logo"
                    width={150}
                    height={150}
                    // className="rounded-full"
                />
           
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-dark-blue hover:text-white hover:bg-slate-800",
                  item.active && "bg-slate-800 text-white"
                )}
                asChild
              >
                <a href={item.href}>
                  <Image src={item.icon} height={20} width={20} alt="icon" className="mr-3 h-4 w-4" />
                  {item.label}
                </a>
              </Button>
            ))}
          </nav>

           {/* Footer */}
          <div className="p-4 ">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </aside>

       {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-3 left-4 z-[555] h-[44px] lg:hidden bg-transparent text-secondary-text border-2 hover:bg-slate-800"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
};

export default AppSideBar;
