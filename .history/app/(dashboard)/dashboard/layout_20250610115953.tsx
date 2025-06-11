// Dasboard layout

import AppSideBar from '@/components/layout/AppSideBar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <AppSideBar />
            <div className="">
                {children}
            </div>
        </div>
    );
}