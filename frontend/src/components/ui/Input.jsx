import { forwardRef, useState, useId } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(function Input(
  {
    label,
    type = 'text',
    error,
    className,
    style,
    id: externalId,
    name,
    onChange: onChangeProp,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    value,
    placeholder: placeholderProp,
    ...props
  },
  ref
) {
  const autoId = useId()
  const inputId = externalId || autoId
  const inputName = name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const [focused, setFocused] = useState(false)
  const [internalHasValue, setInternalHasValue] = useState(false)
  const isControlled = value !== undefined
  const hasValue = isControlled ? String(value).length > 0 : internalHasValue

  return (
    <div style={{ position: 'relative', width: '100%' }} className={cn(className)}>
      <input
        ref={ref}
        id={inputId}
        name={inputName}
        type={type}
        value={value}
        placeholder={label ? (focused ? placeholderProp : '') : placeholderProp}
        onFocus={(e) => {
          setFocused(true)
          onFocusProp?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          if (!isControlled) setInternalHasValue(e.target.value.length > 0)
          onBlurProp?.(e)
        }}
        onChange={(e) => {
          if (!isControlled) setInternalHasValue(e.target.value.length > 0)
          onChangeProp?.(e)
        }}
        style={{
          width: '100%',
          padding: label ? '24px 16px 8px' : '14px 16px',
          fontSize: 'var(--text-base)',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-primary)',
          background: 'var(--color-input-bg)',
          border: `1px solid ${error ? '#c4564a' : focused ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
          borderRadius: 'var(--radius-sm)',
          transition: 'all var(--duration-normal) var(--ease-out)',
          outline: 'none',
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      />
      {label && (
        <label
          htmlFor={inputId}
          style={{
            position: 'absolute',
            left: '16px',
            top: focused || hasValue ? '6px' : '50%',
            transform: focused || hasValue ? 'none' : 'translateY(-50%)',
            fontSize: focused || hasValue ? 'var(--text-xs)' : 'var(--text-base)',
            lineHeight: 1,
            color: error ? '#c4564a' : focused ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
            fontWeight: focused || hasValue ? 500 : 400,
            letterSpacing: focused || hasValue ? 'var(--tracking-wide)' : 'var(--tracking-normal)',
            transition: 'all var(--duration-normal) var(--ease-out)',
            pointerEvents: 'none',
          }}
        >
          {label}
        </label>
      )}
      {error && (
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: '#c4564a',
            marginTop: '4px',
            paddingLeft: '4px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
})
