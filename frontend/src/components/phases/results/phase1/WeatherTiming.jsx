import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M17.66 17.66l1.41 1.41M12 20v2M6.34 17.66l-1.41 1.41M2 12h2M4.93 19.07l1.41-1.41" />
    <circle cx="12" cy="12" r="4" />
    <path d="M16 16a4 4 0 01-8 0" />
  </svg>
)

function Section({ label, value }) {
  if (!value) return null
  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', display: 'block', marginBottom: 'var(--space-1)' }}>
        {label}
      </span>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', lineHeight: 'var(--leading-relaxed)' }}>{value}</p>
    </div>
  )
}

export function WeatherTiming({ data, loading }) {
  return (
    <ResultCard title="Weather & Timing" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Section label="Rain Forecast" value={data?.rainForecast} />
        <Section label="Planting Window" value={data?.plantingWindow} />
        <Section label="Seasonal Fit" value={data?.seasonalFit} />
        {!data?.rainForecast && !data?.plantingWindow && !data?.seasonalFit && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No weather data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
