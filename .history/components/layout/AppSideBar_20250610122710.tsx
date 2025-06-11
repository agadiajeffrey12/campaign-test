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
    { icon: '', label: "My properties", href: "/properties" },
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
                  "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                  item.active && "bg-slate-800 text-white"
                )}
                asChild
              >
                <a href={item.href}>
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </a>
              </Button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AppSideBar;
