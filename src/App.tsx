import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import BudgetsPage from "./pages/BudgetsPage";
import TontinePage from "./pages/TontinePage";
import SettingsPage from "./pages/SettingsPage";
import SecretDashboard from "@/pages/SecretDashboard";
import NotFound from "./pages/NotFound";
import ContributorSpace from "./pages/ContributorSpace";
import { SplashScreen } from "./components/SplashScreen";
import { Onboarding } from "./components/Onboarding";
import { useStore } from "./store/useStore";

const queryClient = new QueryClient();

const App = () => {
  const hasCompletedOnboarding = useStore((state) => state.hasCompletedOnboarding);
  const completeOnboarding = useStore((state) => state.completeOnboarding);
  const [appState, setAppState] = useState<'splash' | 'onboarding' | 'app'>(
    'splash'
  );

  const handleSplashComplete = () => {
    if (hasCompletedOnboarding) {
      setAppState('app');
    } else {
      setAppState('onboarding');
    }
  };

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    setAppState('app');
  };

  if (appState === 'splash') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SplashScreen onComplete={handleSplashComplete} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {appState === 'onboarding' ? (
          <Onboarding onComplete={handleCompleteOnboarding} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/budgets" element={<BudgetsPage />} />
              <Route path="/tontine" element={<TontinePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/admin-dashboard" element={<SecretDashboard />} />
              <Route path="/contributeurs" element={<ContributorSpace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
