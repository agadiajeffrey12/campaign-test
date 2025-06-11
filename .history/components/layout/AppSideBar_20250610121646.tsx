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
        
    </>
  );
};

export default AppSideBar;
