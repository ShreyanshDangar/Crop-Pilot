import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.55a1 1 0 00.9 1.45h12.76a1 1 0 00.9-1.45l-5.069-10.127A2 2 0 0114 9.527V2" />
    <path d="M8.5 2h7M7 16h10" />
  </svg>
)

const urgencyBadge = { Urgent: 'danger', Moderate: 'warning', Normal: 'success' }

export function FertilizerGuidance({ data, loading }) {
  return (
    <ResultCard title="Fertilizer Guidance" icon={icon} badge={data?.urgency} badgeType={urgencyBadge[data?.urgency] || 'info'} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.recommended?.length > 0 && (
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Recommended</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
              {data.recommended.map((item, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {data?.avoid?.length > 0 && (
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: '#c4564a', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Avoid</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
              {data.avoid.map((item, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: '#c4564a', lineHeight: 'var(--leading-relaxed)' }}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {(data?.dosage || data?.timing) && (
          <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
            {data.dosage && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}><strong>Dosage:</strong> {data.dosage}</p>}
            {data.timing && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}><strong>Timing:</strong> {data.timing}</p>}
          </div>
        )}
        {!data?.recommended?.length && !data?.avoid?.length && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No fertilizer guidance available.</p>
        )}
      </div>
    </ResultCard>
  )
}
