import { useState } from "react";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { MainContent } from "./components/MainContent";
import { AdminDashboard } from "./components/AdminDashboard";
import { Button } from "./components/ui/button";
import { Settings, Home } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>('portfolio');

  // Check if we're in admin mode based on URL hash
  useState(() => {
    if (window.location.hash === '#admin') {
      setCurrentView('admin');
    }
  });

  // Update URL when view changes
  const switchView = (view: 'portfolio' | 'admin') => {
    setCurrentView(view);
    window.location.hash = view === 'admin' ? '#admin' : '';
  };

  if (currentView === 'admin') {
    return (
      <>
        <AdminDashboard />
        <Toaster 
          position="top-right" 
          theme="dark"
          className="bg-slate-800 border-slate-700"
        />
        {/* Floating button to return to portfolio */}
        <div className="fixed bottom-6 left-6 z-50">
          <Button
            onClick={() => switchView('portfolio')}
            className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Fixed Left Sidebar */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <ProfileSidebar />
          </header>
          
          {/* Scrollable Right Content */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            <MainContent />
          </main>
        </div>
      </div>

      {/* Floating Admin Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => switchView('admin')}
          size="lg"
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-lg border border-slate-600"
        >
          <Settings className="h-5 w-5 mr-2" />
          Admin
        </Button>
      </div>

      <Toaster 
        position="top-right" 
        theme="dark"
        className="bg-slate-800 border-slate-700"
      />
    </>
  );
}