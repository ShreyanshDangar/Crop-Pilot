import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
)

export function CostView({ data, loading }) {
  const costs = [
    { label: 'Labour Cost', value: data?.labourCost },
    { label: 'Operational Cost', value: data?.operationalCost },
  ]

  return (
    <ResultCard title="Cost Overview" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {costs.map((cost, i) => cost.value !== undefined && cost.value !== null ? (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{cost.label}</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)' }}>{cost.value}</span>
          </div>
        ) : null)}
        {data?.totalCost !== undefined && data?.totalCost !== null && (
          <>
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>Total Cost</span>
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-accent)' }}>{data.totalCost}</span>
              </div>
            </div>
          </>
        )}
        {data?.breakdown && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.breakdown}</p>
        )}
        {!data?.labourCost && !data?.operationalCost && !data?.totalCost && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No cost data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
