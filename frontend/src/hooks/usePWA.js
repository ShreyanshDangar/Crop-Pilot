/*
 * Progressive Web App — shared PWA state hook.
 * Used: React hooks, browser install events, navigator network status, and display-mode media queries.
 * Handled: install prompt availability, online/offline state, and standalone-mode detection.
 * Removed for open-weight release.
 */

export function usePWA() {
  return {
    isInstallable: false,
    isOnline: true,
    isStandalone: false,
    isIOS: false,
    promptInstall: async () => false,
  }
}
