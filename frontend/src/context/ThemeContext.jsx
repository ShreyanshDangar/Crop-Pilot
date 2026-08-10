import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

function migrateLocalStorageKeys() {
  try {
    if (localStorage.getItem('croppilot_migrated')) return
    const migrations = [
      ['godspeed-theme', 'croppilot-theme'],
      ['godspeed-font-family', 'croppilot-font-family'],
      ['godspeed-ui-radius', 'croppilot-ui-radius'],
      ['godspeed-install-dismissed', 'croppilot-install-dismissed'],
      ['godspeed_pending_registration', 'croppilot_pending_registration'],
    ]
    for (const [oldKey, newKey] of migrations) {
      const val = localStorage.getItem(oldKey)
      if (val !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, val)
      }
      localStorage.removeItem(oldKey)
    }
    localStorage.setItem('croppilot_migrated', '1')
  } catch { /* localStorage unavailable */ }
}
migrateLocalStorageKeys()

const FONT_FAMILIES = {
  'dm-sans': "'DM Sans', system-ui, -apple-system, sans-serif",
  'source-serif': "'Source Serif 4', Georgia, 'Times New Roman', serif",
  'space-grotesk': "'Space Grotesk', system-ui, -apple-system, sans-serif",
  'libre-baskerville': "'Libre Baskerville', Georgia, 'Times New Roman', serif",
}

const DEFAULT_RADII = {
  '--radius-xs': '6px',
  '--radius-sm': '10px',
  '--radius-md': '16px',
  '--radius-lg': '20px',
  '--radius-xl': '24px',
  '--radius-2xl': '32px',
}

const SHARP_RADII = {
  '--radius-xs': '2px',
  '--radius-sm': '3px',
  '--radius-md': '4px',
  '--radius-lg': '4px',
  '--radius-xl': '4px',
  '--radius-2xl': '6px',
}

function applyFontFamily(key) {
  const value = FONT_FAMILIES[key] || FONT_FAMILIES['dm-sans']
  document.documentElement.style.setProperty('--font-body', value)
}

function applyUiRadius(mode) {
  const radii = mode === 'sharp' ? SHARP_RADII : DEFAULT_RADII
  const root = document.documentElement
  for (const [prop, val] of Object.entries(radii)) {
    root.style.setProperty(prop, val)
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('croppilot-theme') || 'light'
    } catch {
      return 'light'
    }
  })

  const [fontFamily, setFontFamilyState] = useState(() => {
    try {
      return localStorage.getItem('croppilot-font-family') || 'dm-sans'
    } catch {
      return 'dm-sans'
    }
  })

  const [uiRadius, setUiRadiusState] = useState(() => {
    try {
      return localStorage.getItem('croppilot-ui-radius') || 'rounded'
    } catch {
      return 'rounded'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('croppilot-theme', theme)
    } catch { /* localStorage unavailable */ }
  }, [theme])

  useEffect(() => {
    applyFontFamily(fontFamily)
    try {
      localStorage.setItem('croppilot-font-family', fontFamily)
    } catch { /* localStorage unavailable */ }
  }, [fontFamily])

  useEffect(() => {
    applyUiRadius(uiRadius)
    try {
      localStorage.setItem('croppilot-ui-radius', uiRadius)
    } catch { /* localStorage unavailable */ }
  }, [uiRadius])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const setFontFamily = useCallback((key) => {
    if (FONT_FAMILIES[key]) {
      setFontFamilyState(key)
    }
  }, [])

  const setUiRadius = useCallback((mode) => {
    if (mode === 'rounded' || mode === 'sharp') {
      setUiRadiusState(mode)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontFamily, setFontFamily, uiRadius, setUiRadius }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
