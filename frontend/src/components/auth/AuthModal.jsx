import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../ui/Toast'

const PENDING_REG_KEY = 'croppilot_pending_registration'

export function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login')
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const { login, registerInit, verifyOTP } = useAuth()
  const { addToast } = useToast()
  const otpInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const pending = localStorage.getItem(PENDING_REG_KEY)
      if (pending) {
        try {
          const data = JSON.parse(pending)
          if (data.email) {
            setMode('signup')
            setStep(2)
            setEmail(data.email)
          }
        } catch { /* ignore */ }
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (step === 2 && otpInputRef.current) {
      setTimeout(() => otpInputRef.current?.focus(), 300)
    }
  }, [step])

  const validateEmail = (val) => {
    if (!val) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email'
    return ''
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    const eErr = validateEmail(email)
    setEmailError(eErr)
    setApiError('')
    let pErr = ''
    if (!password) pErr = 'Password is required'
    else if (password.length < 8) pErr = 'Minimum 8 characters'
    setPasswordError(pErr)
    let cErr = ''
    if (!confirmPassword) cErr = 'Please confirm your password'
    else if (confirmPassword !== password) cErr = 'Passwords do not match'
    setConfirmError(cErr)

    if (eErr || pErr || cErr || !name.trim()) return

    setLoading(true)
    try {
      await registerInit(name, email, password, confirmPassword)
      // Save to localStorage for refresh resilience
      localStorage.setItem(PENDING_REG_KEY, JSON.stringify({ email }))
      setStep(2)
      addToast('Verification code sent! Check your email.', 'success')
    } catch (error) {
      const msg = error.message || 'Registration failed'
      setApiError(msg)
      if (msg.toLowerCase().includes('email') || msg.toLowerCase().includes('account')) {
        setEmailError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setApiError('')
    if (!otp || otp.length !== 6) {
      setOtpError('Enter the 6-digit code')
      return
    }
    setOtpError('')

    setLoading(true)
    try {
      await verifyOTP(email, otp)
      localStorage.removeItem(PENDING_REG_KEY)
      addToast('Account verified! Welcome to Crop Pilot.', 'success')
      onClose()
      navigate('/dashboard')
    } catch (error) {
      const msg = error.message || 'Verification failed'
      setOtpError(msg)
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    setApiError('')

    setLoading(true)
    try {
      await login(email, password)
      addToast('Welcome back!', 'success')
      onClose()
      navigate('/dashboard')
    } catch (error) {
      setApiError(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const resetState = () => {
    setStep(1)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
    setOtp('')
    setEmailError('')
    setPasswordError('')
    setConfirmError('')
    setOtpError('')
    setApiError('')
    setLoading(false)
  }

  const switchMode = (newMode) => {
    resetState()
    setMode(newMode)
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="440px">
      <div style={{ padding: '8px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            {mode === 'login'
              ? 'Welcome back'
              : step === 2
                ? 'Verify your email'
                : 'Create your account'}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            {mode === 'login'
              ? 'Sign in to continue to your workspace'
              : step === 2
                ? `We sent a code to ${email}`
                : 'Start building something extraordinary'}
          </p>
        </div>

        <AnimatePresence>
          {apiError && !emailError && !passwordError && !otpError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(196, 86, 74, 0.08)',
                border: '1px solid rgba(196, 86, 74, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                marginBottom: '16px',
                fontSize: 'var(--text-sm)',
                color: '#c4564a',
              }}
            >
              {apiError}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <form noValidate onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(''); setApiError('') }}
                  error={emailError}
                  autoComplete="email"
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setPasswordError(''); setApiError('') }}
                  error={passwordError}
                  autoComplete="current-password"
                />
                <Button
                  variant="accent"
                  size="md"
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  style={{ width: '100%', marginTop: '4px' }}
                >
                  Sign In
                </Button>
              </form>
            </motion.div>
          )}

          {mode === 'signup' && step === 1 && (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Input
                  label="Full name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                />
                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(''); setApiError('') }}
                  error={emailError}
                  autoComplete="email"
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setPasswordError(''); setApiError('') }}
                  error={passwordError}
                  autoComplete="new-password"
                />
                <Input
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setConfirmError(''); setApiError('') }}
                  error={confirmError}
                  autoComplete="new-password"
                />
                <Button
                  variant="accent"
                  size="md"
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  style={{ width: '100%', marginTop: '4px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Send Verification Code
                </Button>
              </form>
            </motion.div>
          )}

          {mode === 'signup' && step === 2 && (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'var(--color-accent-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                </div>
                <Input
                  ref={otpInputRef}
                  label="Verification code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setOtp(val)
                    setOtpError('')
                    setApiError('')
                  }}
                  error={otpError}
                  autoComplete="one-time-code"
                  style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '20px', fontWeight: 600 }}
                />
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                  Code expires in 10 minutes
                </p>
                <Button
                  variant="accent"
                  size="md"
                  type="submit"
                  loading={loading}
                  disabled={loading || otp.length !== 6}
                  style={{ width: '100%' }}
                >
                  Verify & Create Account
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(PENDING_REG_KEY)
                    setStep(1)
                    setOtp('')
                    setOtpError('')
                    setApiError('')
                  }}
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-tertiary)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'color var(--duration-fast) var(--ease-out)',
                    padding: '4px 0',
                    background: 'none',
                    border: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                >
                  Use a different email
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {!(mode === 'signup' && step === 2) && (
          <p
            style={{
              textAlign: 'center',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-tertiary)',
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
              style={{
                color: 'var(--color-accent)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'opacity var(--duration-fast) var(--ease-out)',
                background: 'none',
                border: 'none',
                fontSize: 'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        )}
      </div>
    </Modal>
  )
}
