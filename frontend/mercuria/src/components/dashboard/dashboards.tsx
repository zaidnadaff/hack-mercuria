// pages/dashboard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/SideBar";
import UserDetails from "@/components/dashboard/user-details";
import PlantationDetails from "@/components/dashboard/plantation-details";
import WeatherWidget from "@/components/dashboard/weather-widget";
import SamplingsAllotted from "@/components/dashboard/samplings-allotted";
import ContractOverview from "@/components/dashboard/contract-overview";
import CreditPayments from "@/components/dashboard/credit-payments";
import Alerts from "@/components/dashboard/alerts";
import QuickActions from "@/components/dashboard/quick-actions";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("user-details");

  const renderContent = () => {
    switch (activeView) {
      case "user-details":
        return <UserDetails />;
      case "plantation-details":
        return <PlantationDetails />;
      case "weather":
        return <WeatherWidget />;
      case "samplings":
        return <SamplingsAllotted />;
      case "contracts":
        return <ContractOverview />;
      case "payments":
        return <CreditPayments />;
      case "alerts":
        return <Alerts />;
      case "actions":
        return <QuickActions />;
      default:
        return <UserDetails />;
    }
  };

  const getViewTitle = (view: string) => {
    return view
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="flex-1 md:ml-64">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {getViewTitle(activeView)}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
