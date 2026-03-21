import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const PhaseFlow = lazy(() => import("./pages/PhaseFlow.jsx"));
const PhaseResults = lazy(() => import("./pages/PhaseResults.jsx"));

function App() {
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-brand-50 px-6">
          <div className="rounded-[28px] border border-border-light bg-surface px-6 py-5 text-center shadow-sm">
            <div className="mx-auto cp-spinner" />
            <p className="mt-4 text-sm font-semibold text-text-primary">Loading Crop Pilot...</p>
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/phase/:id" element={<PhaseFlow />} />
          <Route path="/dashboard/phase/:id/results" element={<PhaseResults />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
export default App;
