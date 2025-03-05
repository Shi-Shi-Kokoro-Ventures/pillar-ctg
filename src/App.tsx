
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
import AffordableHousing from "./pages/AffordableHousing";
import RentalAssistance from "./pages/RentalAssistance";
import JobTraining from "./pages/JobTraining";
import MentalHealth from "./pages/MentalHealth";
import CaseManagement from "./pages/CaseManagement";
import FamilySupport from "./pages/FamilySupport";
import HousingVouchers from "./pages/HousingVouchers";
import TenantRights from "./pages/TenantRights";
import HousingCrisisHotline from "./pages/HousingCrisisHotline";
import AssistanceApplication from "./pages/AssistanceApplication";
import OurMission from "./pages/OurMission";
import Leadership from "./pages/Leadership";
import Partners from "./pages/Partners";
import Careers from "./pages/Careers";
import ContactUs from "./pages/ContactUs";
import FinancialLiteracy from "./pages/FinancialLiteracy";
import CommunityEvents from "./pages/CommunityEvents";
import CorporatePartnerships from "./pages/CorporatePartnerships";
import CommunityResources from "./pages/CommunityResources";

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
          <Route path="/affordable-housing" element={<AffordableHousing />} />
          <Route path="/rental-assistance" element={<RentalAssistance />} />
          <Route path="/job-training" element={<JobTraining />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/case-management" element={<CaseManagement />} />
          <Route path="/family-support" element={<FamilySupport />} />
          <Route path="/housing-vouchers" element={<HousingVouchers />} />
          <Route path="/tenant-rights" element={<TenantRights />} />
          <Route path="/housing-crisis-hotline" element={<HousingCrisisHotline />} />
          <Route path="/apply-for-assistance" element={<AssistanceApplication />} />
          <Route path="/our-mission" element={<OurMission />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/financial-literacy" element={<FinancialLiteracy />} />
          <Route path="/community-events" element={<CommunityEvents />} />
          <Route path="/corporate-partnerships" element={<CorporatePartnerships />} />
          <Route path="/community-resources" element={<CommunityResources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
