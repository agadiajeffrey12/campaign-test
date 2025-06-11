// Dasboard layout

import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="dashboard-layout">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
            </div>
            <div className="dashboard-content">
                {children}
            </div>
        </div>
    );
}