import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { Helmet } from "react-helmet";
import AccessibilityControls from "./components/AccessibilityControls";

// Eagerly load the Index page for better initial load experience
import Index from "./pages/Index";

// Lazy load other pages to improve initial load time
const Donate = lazy(() => import("./pages/Donate"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const VolunteerApplication = lazy(() => import("./pages/VolunteerApplication"));
const Emergency = lazy(() => import("./pages/Emergency"));
const TimeBank = lazy(() => import("./pages/TimeBank"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DonateGoods = lazy(() => import("./pages/DonateGoods"));
const Classes = lazy(() => import("./pages/Classes"));
const Advocate = lazy(() => import("./pages/Advocate"));
const AllWays = lazy(() => import("./pages/AllWays"));
const AllNews = lazy(() => import("./pages/AllNews"));
const Housing = lazy(() => import("./pages/Housing"));
const HousingWaitlist = lazy(() => import("./pages/HousingWaitlist"));
const AffordableHousing = lazy(() => import("./pages/AffordableHousing"));
const RentalAssistance = lazy(() => import("./pages/RentalAssistance"));
const JobTraining = lazy(() => import("./pages/JobTraining"));
const MentalHealth = lazy(() => import("./pages/MentalHealth"));
const CaseManagement = lazy(() => import("./pages/CaseManagement"));
const FamilySupport = lazy(() => import("./pages/FamilySupport"));
const HousingVouchers = lazy(() => import("./pages/HousingVouchers"));
const TenantRights = lazy(() => import("./pages/TenantRights"));
const HousingCrisisHotline = lazy(() => import("./pages/HousingCrisisHotline"));
const AssistanceApplication = lazy(() => import("./pages/AssistanceApplication"));
const OurMission = lazy(() => import("./pages/OurMission"));
const Leadership = lazy(() => import("./pages/Leadership"));
const Partners = lazy(() => import("./pages/Partners"));
const Careers = lazy(() => import("./pages/Careers"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const FinancialLiteracy = lazy(() => import("./pages/FinancialLiteracy"));
const CommunityEvents = lazy(() => import("./pages/CommunityEvents"));
const CorporatePartnerships = lazy(() => import("./pages/CorporatePartnerships"));
const CommunityResources = lazy(() => import("./pages/CommunityResources"));
const DonorAdvisedFunds = lazy(() => import("./pages/DonorAdvisedFunds"));
const FindLocalOffice = lazy(() => import("./pages/FindLocalOffice"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
// Legal Pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const DonorRights = lazy(() => import("./pages/DonorRights"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
// Integration Pages
const N8nIntegration = lazy(() => import("./pages/N8nIntegration"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Add security-enhancing query options
      refetchOnWindowFocus: true,
      staleTime: 300000, // 5 minutes
      retry: 1,
    },
    mutations: {
      // Add security-enhancing mutation options
      retry: 0,
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Helmet>
      {/* Enhanced global security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=(), payment=(), usb=(), fullscreen=(self)" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://qbzuocsgfkugpsahesay.supabase.co; form-action 'self'; base-uri 'self'; frame-ancestors 'self'" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      <meta httpEquiv="Cache-Control" content="no-store, max-age=0" />
    </Helmet>
    <TooltipProvider>
      <Sonner />
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <AccessibilityControls />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Index />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/volunteer-application" element={<VolunteerApplication />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/time" element={<TimeBank />} />
            <Route path="/donate-goods" element={<DonateGoods />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/advocate" element={<Advocate />} />
            <Route path="/all-ways" element={<AllWays />} />
            <Route path="/all-news" element={<AllNews />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/housing-waitlist" element={<HousingWaitlist />} />
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
            <Route path="/donor-advised-funds" element={<DonorAdvisedFunds />} />
            <Route path="/find-local-office" element={<FindLocalOffice />} />
            <Route path="/accessibility" element={<Accessibility />} />
              {/* Integration Pages */}
              <Route path="/n8n-integration" element={<N8nIntegration />} />
              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/donor-rights" element={<DonorRights />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
