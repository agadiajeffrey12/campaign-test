// Dashboard layout

import AppSideBar from '@/components/layout/AppSideBar';
import AppTopBar from '@/components/layout/AppTopBar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <AppSideBar />
            
            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-hidden lg:ml-0">
                {/* Top bar */}
                <AppTopBar />
                
                {/* Page content */}
                <main className="flex-1 overflow-auto p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}