import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
)

const recBadge = { 'Sell Now': 'success', Store: 'info', 'Partial Sale': 'warning' }

export function SellVsStore({ data, loading }) {
  return (
    <ResultCard title="Sell vs Store" icon={icon} badge={data?.recommendation} badgeType={recBadge[data?.recommendation] || 'info'} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.reasoning && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.reasoning}</p>
        )}
        {(data?.sellAdvantages?.length > 0 || data?.storeAdvantages?.length > 0) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-accent)', background: 'var(--color-accent-bg)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', display: 'block', marginBottom: 'var(--space-2)' }}>Sell</span>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {data?.sellAdvantages?.map((adv, i) => (
                  <li key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{adv}</li>
                ))}
              </ul>
            </div>
            <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', display: 'block', marginBottom: 'var(--space-2)' }}>Store</span>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {data?.storeAdvantages?.map((adv, i) => (
                  <li key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {!data?.reasoning && !data?.sellAdvantages?.length && !data?.storeAdvantages?.length && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No comparison data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
