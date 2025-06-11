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
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Home, label: "My properties", href: "/properties" },
    { icon: Calendar, label: "Bookings", href: "/bookings" },
    { icon: Users, label: "Guests", href: "/guests" },
    { icon: Mail, label: "Campaigns", href: "/campaigns", active: true },
    { icon: BarChart3, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Support", href: "/support" },
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
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center justify-center">
            
                <Image
                    src="/staqa.png"
                    alt="Logo"
                    width={100}
                    height={100}
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
        </div>
      </aside>
    </>
  );
};

export default AppSideBar;
