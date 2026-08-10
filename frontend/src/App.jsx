import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/ui/Toast'
import { FarmProvider } from './context/FarmContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LandingPage } from './pages/LandingPage'
import { NotFound } from './pages/NotFound'
import { DashboardLayout } from './components/product/DashboardLayout'
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import PhasePage from './pages/PhasePage'
import { InstallPrompt } from './components/pwa/InstallPrompt'
import { OfflineNotice } from './components/pwa/OfflineNotice'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <FarmProvider>
              <OfflineNotice />
              <InstallPrompt />
              <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="crop-selection" element={<PhasePage phaseId="1" />} />
                    <Route path="crop-maintenance" element={<PhasePage phaseId="2" />} />
                    <Route path="harvest-intelligence" element={<PhasePage phaseId="3" />} />
                    <Route path="market-selling" element={<PhasePage phaseId="4" />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </FarmProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
