import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HomePage from "@/pages/HomePage";
import ModulesPage from "@/pages/ModulesPage";
import Module1 from "@/pages/Module1";
import Module2 from "@/pages/Module2";
import Module3 from "@/pages/Module3";
import Module4 from "@/pages/Module4";
import Module5 from "@/pages/Module5";
import Module6 from "@/pages/Module6";
import Module7 from "@/pages/Module7";
import Module8 from "@/pages/Module8";
import Module9 from "@/pages/Module9";
import Module10 from "@/pages/Module10";
import Module11 from "@/pages/Module11";
import Module12 from "@/pages/Module12";
import Module13 from "@/pages/Module13";
import Module14 from "@/pages/Module14";
import Module15 from "@/pages/Module15";
import NotFound from "@/pages/not-found";

function Router() {
  console.log('🔍 Router component rendering');
  
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/modules" component={ModulesPage} />
      <Route path="/module/1" component={Module1} />
      <Route path="/module/2" component={Module2} />
      <Route path="/module/3" component={Module3} />
      <Route path="/module/4" component={Module4} />
      <Route path="/module/5" component={Module5} />
      <Route path="/module/6" component={Module6} />
      <Route path="/module/7" component={Module7} />
      <Route path="/module/8" component={Module8} />
      <Route path="/module/9" component={Module9} />
      <Route path="/module/10" component={Module10} />
      <Route path="/module/11" component={Module11} />
      <Route path="/module/12" component={Module12} />
      <Route path="/module/13" component={Module13} />
      <Route path="/module/14" component={Module14} />
      <Route path="/module/15" component={Module15} />
      <Route component={NotFound} />
    </Switch>
  );
}

function UpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      const handleMessage = (event) => {
        if (event.data) {
          if (event.data.type === 'UPDATE_AVAILABLE') {
            setUpdateAvailable(true);
            setShowUpdateBanner(true);
            
            const features = event.data.features ? ` Features: ${event.data.features.join(', ')}` : '';
            const isLegacy = event.data.isLegacyUpdate;
            
            toast({
              title: isLegacy ? "IMPORTANT: Teacher Sam Upgraded!" : "New Teacher Sam with Hausa Subtitles Available!",
              description: isLegacy ? 
                `Niger language support added! Now includes Hausa and French subtitles.${features}` :
                `Authentic Niger language support with French and Hausa options!${features}`,
              duration: isLegacy ? 15000 : 10000,
            });
          } else if (event.data.type === 'UPDATE_COMPLETE') {
            const newFeatures = event.data.newFeatures ? ` New: ${event.data.newFeatures.join(', ')}` : '';
            toast({
              title: "Update Complete!",
              description: `Teacher Sam with Hausa Subtitles is active!${newFeatures}`,
              duration: 5000,
            });
          }
        }
      };

      navigator.serviceWorker.addEventListener('message', handleMessage);

      // Check for updates every 30 minutes when online for reasonable update checking
      const checkForUpdates = () => {
        if (navigator.onLine) {
          navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg) {
              console.log('Checking for Teacher Sam updates...');
              reg.update();
            }
          });
        }
      };

      const updateInterval = setInterval(checkForUpdates, 30 * 60 * 1000); // 30 minutes
      
      // Check immediately
      checkForUpdates();

      // Also check when the app regains focus
      const handleFocus = () => {
        setTimeout(checkForUpdates, 1000);
      };
      window.addEventListener('focus', handleFocus);

      return () => {
        clearInterval(updateInterval);
        window.removeEventListener('focus', handleFocus);
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }
  }, [toast]);

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
    } else {
      window.location.reload();
    }
  };

  if (!showUpdateBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🆕</div>
          <div>
            <p className="font-semibold">New Teacher Sam with Hausa Subtitles Available!</p>
            <p className="text-sm opacity-90">Authentic Niger language support with French and Hausa subtitle options!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleUpdate}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-4 py-2"
          >
            Update App
          </Button>
          <Button 
            onClick={() => setShowUpdateBanner(false)}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50">
          <UpdateNotification />
          <Header />
          <Router />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
