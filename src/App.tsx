import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JoinWaitlist from "./pages/JoinWaitlist/JoinWaitlist";
import ValuesOfWaitlist from "./pages/ValuesOfWaitlist/ValuesOfWaitlist"
import ExploreNomad from "./pages/ExploreNomad/ExploreNomad"
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu/Menu.jsx"
import Terms from "./pages/Terms/Terms"
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy"
import ScrolltoTop from "./components/ScrolltoTop"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrolltoTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/join-waitlist" element={<JoinWaitlist />} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/values-of-waitlist" element={<ValuesOfWaitlist />} />
          <Route path="/explore-nomad" element={<ExploreNomad />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
