import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiGetMe, apiRegisterInit, apiVerifyOTP, apiLogout } from '../services/authService.js'
import { apiUpdateProfile, apiUpdatePreferences, apiDeleteAccount } from '../services/userService.js'

const AuthContext = createContext(null)
const OPEN_WEIGHT_USER_KEY = 'croppilot_open_weight_user'

function readOpenWeightUser() {
  try {
    const raw = localStorage.getItem(OPEN_WEIGHT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeOpenWeightUser(user) {
  try {
    localStorage.setItem(OPEN_WEIGHT_USER_KEY, JSON.stringify(user))
  } catch {
  }
}

function clearOpenWeightUser() {
  try {
    localStorage.removeItem(OPEN_WEIGHT_USER_KEY)
  } catch {
  }
}

function buildOpenWeightUser(identifier) {
  const rawIdentifier = typeof identifier === 'string' ? identifier.trim() : ''

  if (!rawIdentifier) {
    return {
      name: 'Demo User',
      email: 'demo@croppilot.local',
      avatar: null,
    }
  }

  if (rawIdentifier.includes('@')) {
    const [namePart] = rawIdentifier.split('@')
    return {
      name: namePart || 'Demo User',
      email: rawIdentifier,
      avatar: null,
    }
  }

  return {
    name: rawIdentifier,
    email: `${rawIdentifier}@croppilot.local`,
    avatar: null,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readOpenWeightUser())
  const [loading, setLoading] = useState(() => readOpenWeightUser() === null)

  useEffect(() => {
    const openWeightUser = readOpenWeightUser()
    if (openWeightUser) {
      setUser(openWeightUser)
      setLoading(false)
      return undefined
    }

    let cancelled = false

    async function checkSession() {
      try {
        const data = await apiGetMe()
        if (!cancelled) setUser(data.data.user)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    checkSession()
    return () => { cancelled = true }
  }, [])

  const login = useCallback(async (identifier) => {
    const nextUser = buildOpenWeightUser(identifier)
    writeOpenWeightUser(nextUser)
    setUser(nextUser)
    return nextUser
  }, [])

  const grantDemoAccess = useCallback(async () => {
    return login('demo@croppilot.local')
  }, [login])

  const registerInit = useCallback(async (name, email, password, confirmPassword) => {
    const data = await apiRegisterInit(name, email, password, confirmPassword)
    return data
  }, [])

  const verifyOTP = useCallback(async (email, otp) => {
    const data = await apiVerifyOTP(email, otp)
    setUser(data.data.user)
    return data.data.user
  }, [])

  const logout = useCallback(async () => {
    clearOpenWeightUser()
    try {
      await apiLogout()
    } catch {
    }
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiGetMe()
      setUser(data.data.user)
    } catch {
      setUser(null)
    }
  }, [])

  const updateProfile = useCallback(async (profileData) => {
    const data = await apiUpdateProfile(profileData)
    setUser(data.data.user)
    return data.data.user
  }, [])

  const updatePreferences = useCallback(async (prefs) => {
    const data = await apiUpdatePreferences(prefs)
    setUser(data.data.user)
    return data.data.user
  }, [])

  const deleteAccount = useCallback(async () => {
    await apiDeleteAccount()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        grantDemoAccess,
        registerInit,
        verifyOTP,
        logout,
        refreshUser,
        updateProfile,
        updatePreferences,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
