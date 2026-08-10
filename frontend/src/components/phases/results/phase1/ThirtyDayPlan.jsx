import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

export function ThirtyDayPlan({ data, loading }) {
  return (
    <ResultCard title="30-Day Action Plan" icon={icon} loading={loading}>
      {data?.weeks?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {data.weeks.map((week, i) => (
            <div key={i}>
              <span style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-accent)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 'var(--space-2)',
              }}>
                {week.label}
              </span>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {week.tasks?.map((task, j) => (
                  <li key={j} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                    {task}
                  </li>
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
