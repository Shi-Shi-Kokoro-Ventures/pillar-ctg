
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Emergency from "./pages/Emergency";
import TimeBank from "./pages/TimeBank";
import NotFound from "./pages/NotFound";
import DonateGoods from "./pages/DonateGoods";
import Classes from "./pages/Classes";
import Advocate from "./pages/Advocate";
import AllWays from "./pages/AllWays";
import AllNews from "./pages/AllNews";
import Housing from "./pages/Housing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/time" element={<TimeBank />} />
          <Route path="/donate-goods" element={<DonateGoods />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/advocate" element={<Advocate />} />
          <Route path="/all-ways" element={<AllWays />} />
          <Route path="/all-news" element={<AllNews />} />
          <Route path="/housing" element={<Housing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
