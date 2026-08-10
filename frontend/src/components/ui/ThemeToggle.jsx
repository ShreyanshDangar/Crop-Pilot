import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

const sunPath = 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'
const moonPath = 'M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z'

export function ThemeToggle({ size = 20, className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={className}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 16,
        height: size + 16,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        transition: 'all var(--duration-normal) var(--ease-out)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--color-surface-hover)'
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--color-surface)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isDark ? (
            <motion.path
              key="moon"
              d={moonPath}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.5 }}
              stroke="var(--color-olive)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="var(--color-olive)"
              fillOpacity={0.15}
            />
          ) : (
            <>
              <motion.circle
                key="sun-circle"
                cx="12"
                cy="12"
                r="5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                stroke="var(--color-olive)"
                strokeWidth="2"
                fill="var(--color-olive)"
                fillOpacity={0.15}
              />
              <motion.path
                key="sun-rays"
                d={sunPath}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                stroke="var(--color-olive)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </motion.div>
    </button>
  )
}
