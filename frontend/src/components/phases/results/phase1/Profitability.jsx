import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
)

const trendBadgeType = { Rising: 'success', Declining: 'danger', Stable: 'info' }

export function Profitability({ data, loading }) {
  const badgeType = trendBadgeType[data?.trend] || 'info'

  const rows = [
    { label: 'Estimated Cost', value: data?.estimatedCost, unit: 'INR/acre' },
    { label: 'Expected Yield', value: data?.expectedYield },
    { label: 'Market Price', value: data?.marketPrice, unit: 'INR/quintal' },
    { label: 'Est. Profit', value: data?.estimatedProfit, unit: 'INR/acre', highlight: true },
  ]

  return (
    <ResultCard title="Profitability" icon={icon} badge={data?.trend} badgeType={badgeType} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{row.label}</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: row.highlight ? 700 : 500,
              color: row.highlight ? 'var(--color-accent)' : 'var(--color-text-primary)',
            }}>
              {row.value ?? '—'}{row.unit && row.value ? ` ${row.unit}` : ''}
            </span>
          </div>
        ))}
      </div>
    </ResultCard>
  )
}
