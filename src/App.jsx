import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import ProfileSetup from './pages/ProfileSetup';
import DashboardView from './pages/DashboardView';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 pt-16 h-full">
        <Sidebar sidebarOpen={sidebarOpen} />
        <main className={`flex-1 min-h-[calc(100vh-64px)] p-4 sm:p-8 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-16'}`}>
          {!currentPlan ? (
            <ProfileSetup onPlanGenerated={setCurrentPlan} />
          ) : (
            <DashboardView currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
          )}
        </main>
      </div>
    </div>
  );
}