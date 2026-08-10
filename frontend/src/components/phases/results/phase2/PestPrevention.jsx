import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 116 0v1" />
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 014-4h4a4 4 0 014 4v3c0 3.3-2.7 6-6 6" />
    <path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M6 17H3M21 5c0 2.1-1.6 3.8-3.53 4M18 13h4M18 17h3" />
  </svg>
)

export function PestPrevention({ data, loading }) {
  return (
    <ResultCard title="Pest Prevention" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.riskSigns?.length > 0 && (
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: '#c4564a', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Risk Signs</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
              {data.riskSigns.map((sign, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: '#c4564a', lineHeight: 'var(--leading-relaxed)' }}>{sign}</li>
              ))}
            </ul>
          </div>
        )}
        {data?.prevention?.length > 0 && (
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Prevention Steps</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
              {data.prevention.map((step, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{step}</li>
              ))}
            </ul>
          </div>
        )}
        {data?.monitoringAlert && (
          <div style={{ padding: 'var(--space-3)', background: 'rgba(196, 156, 74, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #c49c4a' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{data.monitoringAlert}</p>
          </div>
        )}
        {!data?.riskSigns?.length && !data?.prevention?.length && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No pest data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
