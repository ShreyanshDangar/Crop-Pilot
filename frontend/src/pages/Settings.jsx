import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { EmptyState } from '../components/ui/EmptyState'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../components/ui/Toast'

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'billing', label: 'Billing' },
]

export function Settings() {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '6px',
          }}
        >
          Settings
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>
          Manage your account, preferences, and workspace configuration.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          padding: '3px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          marginBottom: 'clamp(24px, 3vw, 36px)',
          overflowX: 'auto',
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 'var(--radius-pill)',
              fontSize: 'var(--text-sm)',
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              background: activeTab === tab.id ? 'var(--color-bg)' : 'transparent',
              transition: 'all var(--duration-normal) var(--ease-out)',
              cursor: 'pointer',
              border: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'account' && <AccountSection />}
          {activeTab === 'appearance' && <AppearanceSection />}
          {activeTab === 'billing' && <BillingSection />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SectionCard({ title, description, children }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: 'clamp(20px, 3vw, 32px)',
        marginBottom: '16px',
      }}
    >
      {title && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '4px',
            }}
          >
            {title}
          </h3>
          {description && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

function resizeImage(file, maxDim = 256) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let w = img.width
      let h = img.height
      if (w > maxDim || h > maxDim) {
        if (w > h) { h = Math.round(h * maxDim / w); w = maxDim }
        else { w = Math.round(w * maxDim / h); h = maxDim }
      }
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }
    img.src = URL.createObjectURL(file)
  })
}

function AccountSection() {
  const { user, updateProfile, deleteAccount } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [profileName, setProfileName] = useState(user?.name || '')
  const [profileEmail] = useState(user?.email || '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const photoInputRef = useRef(null)
  const [profilePhoto, setProfilePhoto] = useState(() => {
    try { return localStorage.getItem('croppilot_profile_photo') || null } catch { return null }
  })

  useEffect(() => {
    if (user) {
      setProfileName(user.name || '')
    }
  }, [user])

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    try {
      const base64 = await resizeImage(file)
      localStorage.setItem('croppilot_profile_photo', base64)
      setProfilePhoto(base64)
      addToast('Profile photo updated', 'success')
    } catch {
      addToast('Failed to process image', 'error')
    }
  }

  const handleRemovePhoto = () => {
    try { localStorage.removeItem('croppilot_profile_photo') } catch { /* ignore */ }
    setProfilePhoto(null)
    addToast('Profile photo removed', 'info')
  }

  const handleSave = async () => {
    if (!profileName.trim()) {
      addToast('Name cannot be empty', 'error')
      return
    }
    setSaving(true)
    try {
      await updateProfile({ name: profileName.trim() })
      addToast('Profile updated', 'success')
    } catch (error) {
      addToast(error.message || 'Failed to update profile', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteAccount()
      addToast('Account deleted', 'info')
      navigate('/')
    } catch (error) {
      addToast(error.message || 'Failed to delete account', 'error')
      setDeleting(false)
    }
  }

  return (
    <>
      <SectionCard title="Profile" description="Your personal information and account details.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-accent-bg)',
                border: '2px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              {profilePhoto ? (
                <img src={profilePhoto} alt={user?.name || 'Profile'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : user?.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Profile Photo
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                PNG, JPG, WebP
              </p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              {profilePhoto && (
                <Button variant="ghost" size="sm" onClick={handleRemovePhoto} style={{ color: '#c4564a', border: '1px solid rgba(196, 86, 74, 0.3)' }}>
                  Remove
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => photoInputRef.current?.click()}>
                Upload
              </Button>
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoSelect}
              style={{ display: 'none' }}
            />
          </div>

          <Input
            label="Full name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            label="Email address"
            type="email"
            value={profileEmail}
            placeholder="you@example.com"
            disabled
            style={{ opacity: 0.7 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button variant="primary" size="sm" onClick={handleSave} loading={saving} disabled={saving}>
            Save Changes
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="Danger Zone" description="Irreversible account actions.">
        <AnimatePresence>
          {showDeleteConfirm ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                Are you sure? This will permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  loading={deleting}
                  disabled={deleting}
                  style={{ color: '#c4564a', border: '1px solid rgba(196, 86, 74, 0.3)' }}
                >
                  Yes, Delete My Account
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              style={{ color: '#c4564a', border: '1px solid rgba(196, 86, 74, 0.3)' }}
            >
              Delete Account
            </Button>
          )}
        </AnimatePresence>
      </SectionCard>
    </>
  )
}

const fontOptions = [
  { key: 'dm-sans', label: 'DM Sans' },
  { key: 'source-serif', label: 'Source Serif' },
  { key: 'space-grotesk', label: 'Space Grotesk' },
  { key: 'libre-baskerville', label: 'Libre Baskerville' },
]

const radiusOptions = [
  { key: 'rounded', label: 'Rounded' },
  { key: 'sharp', label: 'Sharp' },
]

function SegmentedControl({ options, value, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        padding: '3px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {options.map((option) => {
        const isActive = value === option.key
        return (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: 'var(--text-xs)',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
              background: isActive ? 'var(--color-bg)' : 'transparent',
              transition: 'all var(--duration-fast) var(--ease-out)',
              cursor: 'pointer',
              border: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function AppearanceSection() {
  const { fontFamily, setFontFamily, uiRadius, setUiRadius } = useTheme()

  return (
    <SectionCard title="Appearance" description="Customise how Crop Pilot looks and feels.">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
            Color mode
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
            Switch between light and dark themes
          </p>
        </div>
        <ThemeToggle size={20} />
      </div>

      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
              Font family
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
              Choose the typeface for body text
            </p>
          </div>
          <SegmentedControl options={fontOptions} value={fontFamily} onChange={setFontFamily} />
        </div>
      </div>

      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
              Corner style
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
              Rounded edges or sharp corners across the UI
            </p>
          </div>
          <SegmentedControl options={radiusOptions} value={uiRadius} onChange={setUiRadius} />
        </div>
      </div>
    </SectionCard>
  )
}

function BillingSection() {
  return (
    <SectionCard>
      <EmptyState
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        }
        title="Billing"
        description="Billing information and subscription management will appear here when plans become available."
      />
    </SectionCard>
  )
}
