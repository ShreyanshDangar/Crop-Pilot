/*
 * Dashboard page transition wrapper.
 * Used: Framer Motion with React Router navigation.
 * Rendered: full-screen page-to-page cover transitions between dashboard routes.
 * Removed for open-weight release.
 */

import { useNavigate } from 'react-router-dom'

export function usePageTransition() {
  const navigate = useNavigate()

  return { navigateTo: navigate }
}

export function PageTransitionProvider({ children }) {
  return children
}
