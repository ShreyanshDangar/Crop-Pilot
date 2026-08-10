import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
)

export function LabourEstimate({ data, loading }) {
  const rows = [
    { label: 'Labour Days', value: data?.labourDays },
    { label: 'Workers Needed', value: data?.workersNeeded },
    { label: 'Duration', value: data?.duration },
  ]

  return (
    <ResultCard title="Labour Estimate" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {rows.map((row, i) => row.value !== undefined && row.value !== null ? (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{row.label}</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)' }}>{row.value}</span>
          </div>
        ) : null)}
        {data?.notes && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginTop: 'var(--space-1)' }}>{data.notes}</p>
        )}
        {!data?.labourDays && !data?.workersNeeded && !data?.duration && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No labour data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
