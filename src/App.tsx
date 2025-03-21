import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { Helmet } from "react-helmet";
import AccessibilityControls from "./components/AccessibilityControls";
import { adminRoutes } from "./routes/adminRoutes";
import { AuthProvider } from "./contexts/AuthContext";

// Eagerly load the Index page for better initial load experience
import Index from "./pages/Index";

// Group lazy-loaded routes by category for better organization
const HousingRoutes = {
  Housing: lazy(() => import("./pages/Housing")),
  HousingWaitlist: lazy(() => import("./pages/HousingWaitlist")),
  AffordableHousing: lazy(() => import("./pages/AffordableHousing")),
  RentalAssistance: lazy(() => import("./pages/RentalAssistance")),
  HousingVouchers: lazy(() => import("./pages/HousingVouchers")),
  TenantRights: lazy(() => import("./pages/TenantRights")),
  HousingCrisisHotline: lazy(() => import("./pages/HousingCrisisHotline")),
};

const SupportRoutes = {
  JobTraining: lazy(() => import("./pages/JobTraining")),
  MentalHealth: lazy(() => import("./pages/MentalHealth")),
  CaseManagement: lazy(() => import("./pages/CaseManagement")),
  FamilySupport: lazy(() => import("./pages/FamilySupport")),
  FinancialLiteracy: lazy(() => import("./pages/FinancialLiteracy")),
};

const GetInvolvedRoutes = {
  Donate: lazy(() => import("./pages/Donate")),
  Volunteer: lazy(() => import("./pages/Volunteer")),
  VolunteerApplication: lazy(() => import("./pages/VolunteerApplication")),
  DonateGoods: lazy(() => import("./pages/DonateGoods")),
  Advocate: lazy(() => import("./pages/Advocate")),
};

const InformationRoutes = {
  AllWays: lazy(() => import("./pages/AllWays")),
  AllNews: lazy(() => import("./pages/AllNews")),
  Classes: lazy(() => import("./pages/Classes")),
  Emergency: lazy(() => import("./pages/Emergency")),
  TimeBank: lazy(() => import("./pages/TimeBank")),
  FindLocalOffice: lazy(() => import("./pages/FindLocalOffice")),
};

const AboutRoutes = {
  OurMission: lazy(() => import("./pages/OurMission")),
  Leadership: lazy(() => import("./pages/Leadership")),
  Partners: lazy(() => import("./pages/Partners")),
  Careers: lazy(() => import("./pages/Careers")),
  ContactUs: lazy(() => import("./pages/ContactUs")),
};

const LegalRoutes = {
  PrivacyPolicy: lazy(() => import("./pages/PrivacyPolicy")),
  TermsOfService: lazy(() => import("./pages/TermsOfService")),
  DonorRights: lazy(() => import("./pages/DonorRights")),
  Accessibility: lazy(() => import("./pages/Accessibility")),
};

// Integration Pages
const N8nIntegration = lazy(() => import("./pages/N8nIntegration"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Time = lazy(() => import("./pages/Time"));
const AssistanceApplication = lazy(() => import("./pages/AssistanceApplication"));
const EmploymentApplication = lazy(() => import("./pages/EmploymentApplication"));

// Enhanced QueryClient configuration with proper TypeScript support
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      gcTime: 900000, // 15 minutes
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

// Helper function to convert route key to path
const routeKeyToPath = (key: string) => {
  // Convert camelCase to kebab-case without trailing dash
  return `/${key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}`;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <AccessibilityControls />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <main id="main-content" tabIndex={-1} className="use-rounded-corners">
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
              <Routes>
                <Route path="/" element={<Index />} />
              
              {/* Housing Routes */}
              {Object.entries(HousingRoutes).map(([key, Component]) => (
                <Route 
                  key={key} 
                  path={routeKeyToPath(key)} 
                  element={<Component />} 
                />
              ))}

              {/* Support Routes */}
              {Object.entries(SupportRoutes).map(([key, Component]) => (
                <Route 
                  key={key} 
                  path={routeKeyToPath(key)} 
                  element={<Component />} 
                />
              ))}

              {/* Get Involved Routes */}
              {Object.entries(GetInvolvedRoutes).map(([key, Component]) => (
                <Route 
                  key={key} 
                  path={routeKeyToPath(key)} 
                  element={<Component />} 
                />
              ))}

              {/* Information Routes */}
              {Object.entries(InformationRoutes).map(([key, Component]) => (
                <Route 
                  key={key} 
                  path={routeKeyToPath(key)} 
                  element={<Component />} 
                />
              ))}

              {/* About Routes */}
              {Object.entries(AboutRoutes).map(([key, Component]) => (
                <Route 
                  key={key} 
                  path={routeKeyToPath(key)} 
                  element={<Component />} 
                />
              ))}

              {/* Legal Routes */}
              {Object.entries(LegalRoutes).map(([key, Component]) => (
                <Route 
                  key={key} 
                  path={routeKeyToPath(key)} 
                  element={<Component />} 
                />
              ))}

              {/* Admin Routes - Organized in a separate file */}
              {adminRoutes}

              {/* Integration Routes */}
              <Route path="/n8n-integration" element={<N8nIntegration />} />
              
              {/* Application Routes */}
              <Route path="/apply-for-assistance" element={<AssistanceApplication />} />
              <Route path="/apply-for-employment" element={<EmploymentApplication />} />
              
              {/* Redirect routes for referenced but unimplemented pages */}
              <Route path="/contact-a-specialist" element={<Navigate to="/coming-soon" />} />
              <Route path="/apply-for-voucher" element={<Navigate to="/coming-soon" />} />
              
              {/* Additional routes */}
              <Route path="/time" element={<Time />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
