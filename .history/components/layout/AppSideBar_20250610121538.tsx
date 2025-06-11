import Image from "next/image";
import React from "react";
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
    <div className="w-[242px] py-[16px] pl-[16px] pr-[32px] h-[962px] bg-white border-r border-light-grey fixed top-0 left-0">
      <div className="flex items-center justify-center">
        <Image src={"/staqa.png"} height={150} width={150} alt="staqa logo" />
      </div>
    </div>
  );
};

export default AppSideBar;
