// Dasboard layout

import AppSideBar from '@/components/layout/AppSideBar';
import AppTopBar from '@/components/layout/AppTopBar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <AppSideBar />
            <div className="ml-auto">
                <AppTopBar/>
                {children}
            </div>
        </div>
    );
}