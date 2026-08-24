import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import WellnessChatbot from "./components/WellnessChatbot";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoader from "./components/PageLoader";
import "./App.css";

const Welcome = lazy(() => import("./pages/Welcome"));
const Auth = lazy(() => import("./pages/Auth"));
const CareSpace = lazy(() => import("./pages/CareSpace"));
const MenstrualHealth = lazy(() => import("./pages/MenstrualHealth"));
const NutritionWellness = lazy(() => import("./pages/NutritionWellness"));
const MentalHealth = lazy(() => import("./pages/MentalHealth"));
const DiagnosisScreener = lazy(() => import("./pages/DiagnosisScreener"));
const PhysicalHealth = lazy(() => import("./pages/PhysicalHealth"));
const MythVsFact = lazy(() => import("./pages/MythVsFact"));
const PersonalHygiene = lazy(() => import("./pages/PersonalHygiene"));
const Feedback = lazy(() => import("./pages/Feedback"));

function App() {
  const location = useLocation();
  const minimalPage = ["/", "/auth"].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="site-shell">
      {!minimalPage && <SiteHeader />}
      <RouteErrorBoundary path={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/care-space" element={<ProtectedRoute><CareSpace /></ProtectedRoute>} />
            <Route path="/menstrual-health" element={<MenstrualHealth />} />
            <Route path="/nutrition-wellness" element={<NutritionWellness />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/diagnosis-screener" element={<DiagnosisScreener />} />
            <Route path="/physical-health" element={<PhysicalHealth />} />
            <Route path="/myth-vs-fact" element={<MythVsFact />} />
            <Route path="/personal-hygiene" element={<PersonalHygiene />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
      {!minimalPage && <SiteFooter />}
      <WellnessChatbot />
    </div>
  );
}

export default App;
