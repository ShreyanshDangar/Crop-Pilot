import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
  </svg>
)

export function TopCropPicks({ data, loading }) {
  return (
    <ResultCard title="Top Crop Picks" icon={icon} loading={loading}>
      {data?.crops?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {data.crops.map((crop, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-tertiary)', width: '20px', fontFamily: 'var(--font-body)' }}>
                {i + 1}.
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)' }}>{crop.name}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 600 }}>{crop.suitability}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: 'var(--radius-pill)', background: 'var(--color-border)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${crop.suitability}%`, background: 'var(--color-accent)', borderRadius: 'var(--radius-pill)', transition: 'width var(--duration-slow) var(--ease-out)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No crop recommendations available.</p>
      )}
    </ResultCard>
  )
}
