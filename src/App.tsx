
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CardProvider } from "./contexts/CardContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Index from "./pages/Index";
import NFTs from "./pages/NFTs";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CardProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)] transition-colors duration-300">
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/nfts" element={<NFTs />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CardProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
