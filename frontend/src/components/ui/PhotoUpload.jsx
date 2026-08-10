import { useRef, useState, useCallback } from 'react'

export function PhotoUpload({
  slots = [],
  images = [],
  onAddImage,
  onAddMultiple,
  onRemoveImage,
  soilReport,
  onAddSoilReport,
  onClearSoilReport,
  showSoilReport = false,
  disabled = false,
}) {
  const fileRef = useRef(null)
  const soilRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    if (disabled) return
    const files = e.dataTransfer.files
    if (files.length > 0 && onAddMultiple) onAddMultiple(files)
  }, [disabled, onAddMultiple])

  const handleFileChange = useCallback((e) => {
    const files = e.target.files
    if (files.length > 0 && onAddMultiple) onAddMultiple(files)
    e.target.value = ''
  }, [onAddMultiple])

  const handleSlotClick = useCallback((index) => {
    if (disabled) return
    if (images[index]) {
      onRemoveImage(index)
    } else {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/jpeg,image/png,image/webp'
      input.onchange = (e) => {
        if (e.target.files[0] && onAddImage) onAddImage(index, e.target.files[0])
      }
      input.click()
    }
  }, [disabled, images, onAddImage, onRemoveImage])

  return (
    <div style={{ width: '100%' }}>
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          padding: 'var(--space-4)',
          border: `2px dashed ${dragOver ? 'var(--color-accent)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)',
          background: dragOver ? 'var(--color-accent-bg)' : 'transparent',
          transition: 'all var(--duration-normal) var(--ease-out)',
          textAlign: 'center',
          marginBottom: 'var(--space-4)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
        onClick={() => !disabled && fileRef.current?.click()}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 'var(--space-2)' }}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          Drag photos here or click to browse
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-1)' }}>
          JPEG, PNG, WebP up to 15MB each
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {slots.map((slot, index) => {
          const img = images[index]
          return (
            <div
              key={index}
              onClick={() => handleSlotClick(index)}
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${img ? 'var(--color-accent)' : 'var(--color-border)'}`,
                background: img ? 'transparent' : 'var(--color-surface)',
                overflow: 'hidden',
                position: 'relative',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all var(--duration-fast) var(--ease-out)',
              }}
              onMouseEnter={e => {
                if (!disabled) e.currentTarget.style.borderColor = 'var(--color-accent)'
              }}
              onMouseLeave={e => {
                if (!disabled) e.currentTarget.style.borderColor = img ? 'var(--color-accent)' : 'var(--color-border)'
              }}
            >
              {img ? (
                <>
                  <img
                    src={img.preview}
                    alt={slot.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-1)',
                      right: 'var(--space-1)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: 'var(--space-2)',
                    textAlign: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-1)', lineHeight: 1.2 }}>
                    {slot.label}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showSoilReport && (
        <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            Soil Report (optional)
          </p>
          {soilReport ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {soilReport.name}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onClearSoilReport() }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#c4564a',
                  padding: 'var(--space-1)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={() => soilRef.current?.click()}
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                border: '1px dashed var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-body)',
                transition: 'border-color var(--duration-fast) var(--ease-out)',
              }}
              onMouseEnter={e => { if (!disabled) e.currentTarget.style.borderColor = 'var(--color-accent)' }}
              onMouseLeave={e => { if (!disabled) e.currentTarget.style.borderColor = 'var(--color-border)' }}
            >
              Upload soil report (PDF, JPEG, PNG)
            </button>
          )}
          <input
            ref={soilRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(e) => {
              if (e.target.files[0] && onAddSoilReport) onAddSoilReport(e.target.files[0])
              e.target.value = ''
            }}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  )
}
