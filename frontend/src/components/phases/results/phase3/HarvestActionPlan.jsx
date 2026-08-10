import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 12l2 2 4-4" /><path d="M9 18h6" />
  </svg>
)

export function HarvestActionPlan({ data, loading }) {
  return (
    <ResultCard title="Harvest Action Plan" icon={icon} loading={loading}>
      {data?.days?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {data.days.map((day, i) => (
            <div key={i}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', display: 'block', marginBottom: 'var(--space-2)' }}>
                {day.label}
              </span>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {day.tasks?.map((task, j) => (
                  <li key={j} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No action plan available.</p>
      )}
    </ResultCard>
  )
}
