import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" />
  </svg>
)

const scenarioBorder = { 'Best Case': 'var(--color-accent)', 'Average Case': 'var(--color-border)', 'Cautious Case': '#c49c4a' }

export function CostMargin({ data, loading }) {
  return (
    <ResultCard title="Cost & Margin" icon={icon} loading={loading}>
      {data?.scenarios?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {data.scenarios.map((scenario, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${scenarioBorder[scenario.label] || 'var(--color-border)'}`,
                borderLeft: `3px solid ${scenarioBorder[scenario.label] || 'var(--color-border)'}`,
                background: 'var(--color-surface)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>{scenario.label}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{scenario.margin}</span>
              </div>
              {scenario.detail && (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>{scenario.detail}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No cost data available.</p>
      )}
    </ResultCard>
  )
}
