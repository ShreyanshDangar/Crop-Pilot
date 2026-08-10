import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

export function TransportOptions({ data, loading }) {
  return (
    <ResultCard title="Transport Options" icon={icon} badge="Platform" badgeType="info" loading={loading}>
      {data?.routes?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {data.routes.map((route, i) => (
            <div key={i} style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>{route.destination}</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                {route.distance && <span>Distance: {route.distance}</span>}
                {route.vehicleType && <span>Vehicle: {route.vehicleType}</span>}
                {route.cost && <span>Cost: INR {route.cost}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No transport options available.</p>
      )}
    </ResultCard>
  )
}
