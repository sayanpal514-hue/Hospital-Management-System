import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased">
      <Sidebar />
      <div className="pl-60">
        <Header />
        <main className="relative pt-16 bg-surface min-h-screen">
          <div className="w-full px-space-xl py-space-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
