import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../DashboardSharedComponents/Sidebar';
import TopBar from '../DashboardSharedComponents/TopBar';
import { useAuth } from '../../Context/AuthContext';
function DashboardLayout() {



    return (
        <>
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8 flex-1">
                <TopBar />
                <Outlet />
            </main>
        </div>
        </>
      );
}

export default DashboardLayout





