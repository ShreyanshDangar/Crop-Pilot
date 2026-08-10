import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M17.66 17.66l1.41 1.41M12 20v2M6.34 17.66l-1.41 1.41M2 12h2M4.93 19.07l1.41-1.41" />
    <circle cx="12" cy="12" r="4" />
    <path d="M16 16a4 4 0 01-8 0" />
  </svg>
)

export function WeatherForecast({ data, loading }) {
  return (
    <ResultCard title="Weather Forecast" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {(data?.temperature || data?.rainfall) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            {data.temperature && (
              <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Temperature</span>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.temperature}</p>
              </div>
            )}
            {data.rainfall && (
              <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Rainfall</span>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.rainfall}</p>
              </div>
            )}
          </div>
        )}
        {data?.outlook && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.outlook}</p>
        )}
        {data?.cropImpact && (
          <div style={{ padding: 'var(--space-3)', background: 'var(--color-accent-bg)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Crop Impact</span>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.cropImpact}</p>
          </div>
        )}
        {!data?.temperature && !data?.rainfall && !data?.outlook && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No weather data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
