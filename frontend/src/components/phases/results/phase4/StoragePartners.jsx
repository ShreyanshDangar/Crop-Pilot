import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h18v7H3zM3 14h18v7H3z" /><path d="M7 7h.01M7 18h.01" />
  </svg>
)

export function StoragePartners({ data, loading }) {
  return (
    <ResultCard title="Storage Partners" icon={icon} badge="Platform" badgeType="info" loading={loading}>
      {data?.options?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {data.options.map((opt, i) => (
            <div key={i} style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>{opt.name}</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                {opt.distance && <span>Distance: {opt.distance}</span>}
                {opt.capacity && <span>Capacity: {opt.capacity}</span>}
                {opt.price && <span>Price: {opt.price}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No storage options available.</p>
      )}
    </ResultCard>
  )
}
