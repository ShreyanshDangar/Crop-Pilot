import { cn } from '../../utils/cn'

export function Skeleton({
  width,
  height = '16px',
  borderRadius = 'var(--radius-sm)',
  className,
  style,
}) {
  return (
    <div
      className={cn('animate-shimmer', className)}
      style={{
        width: width || '100%',
        height,
        borderRadius,
        ...style,
      }}
    />
  )
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn(className)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="14px"
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }) {
  return (
    <div
      className={cn(className)}
      style={{
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <Skeleton height="140px" borderRadius="var(--radius-md)" style={{ marginBottom: '16px' }} />
      <Skeleton height="18px" width="65%" style={{ marginBottom: '10px' }} />
      <SkeletonText lines={2} />
    </div>
  )
}
