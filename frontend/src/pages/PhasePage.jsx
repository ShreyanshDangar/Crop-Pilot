import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePhaseFlow } from '../hooks/usePhaseFlow'
import { useImageUpload } from '../hooks/useImageUpload'
import { useFarm } from '../context/FarmContext'
import { getSessionById } from '../services/farmService'
import { PHASES, PHOTO_SLOTS, QUICK_ACTIONS } from '../config/phases'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { DropdownSelect } from '../components/ui/DropdownSelect'
import { SliderInput } from '../components/ui/SliderInput'
import { ToggleSwitch } from '../components/ui/ToggleSwitch'
import { MultiSelect } from '../components/ui/MultiSelect'
import { PhotoUpload } from '../components/ui/PhotoUpload'
import { ProgressDots } from '../components/ui/ProgressDots'
import { EmptyState } from '../components/ui/EmptyState'

import { TopCropPicks } from '../components/phases/results/phase1/TopCropPicks'
import { Profitability } from '../components/phases/results/phase1/Profitability'
import { Resources } from '../components/phases/results/phase1/Resources'
import { WeatherTiming } from '../components/phases/results/phase1/WeatherTiming'
import { RiskLevel } from '../components/phases/results/phase1/RiskLevel'
import { ThirtyDayPlan } from '../components/phases/results/phase1/ThirtyDayPlan'

import { FertilizerGuidance } from '../components/phases/results/phase2/FertilizerGuidance'
import { PestPrevention } from '../components/phases/results/phase2/PestPrevention'
import { WeatherForecast } from '../components/phases/results/phase2/WeatherForecast'
import { SoilSustainability } from '../components/phases/results/phase2/SoilSustainability'
import { WaterPlanning } from '../components/phases/results/phase2/WaterPlanning'
import { MaintenancePlan } from '../components/phases/results/phase2/MaintenancePlan'

import { HarvestReadiness } from '../components/phases/results/phase3/HarvestReadiness'
import { BestWindow } from '../components/phases/results/phase3/BestWindow'
import { WeatherRisk } from '../components/phases/results/phase3/WeatherRisk'
import { LabourEstimate } from '../components/phases/results/phase3/LabourEstimate'
import { CostView } from '../components/phases/results/phase3/CostView'
import { PostHarvestCare } from '../components/phases/results/phase3/PostHarvestCare'
import { HarvestActionPlan } from '../components/phases/results/phase3/HarvestActionPlan'

import { SaleReadiness } from '../components/phases/results/phase4/SaleReadiness'
import { QualitySnapshot } from '../components/phases/results/phase4/QualitySnapshot'
import { PriceRange } from '../components/phases/results/phase4/PriceRange'
import { HistoricalPrice } from '../components/phases/results/phase4/HistoricalPrice'
import { CostMargin } from '../components/phases/results/phase4/CostMargin'
import { SellVsStore } from '../components/phases/results/phase4/SellVsStore'
import { StoragePartners } from '../components/phases/results/phase4/StoragePartners'
import { TransportOptions } from '../components/phases/results/phase4/TransportOptions'
import { BuyerVisibility } from '../components/phases/results/phase4/BuyerVisibility'

const RESULT_CARD_MAP = {
  1: [
    { key: 'topCropPicks', Component: TopCropPicks },
    { key: 'profitability', Component: Profitability },
    { key: 'resources', Component: Resources },
    { key: 'weatherTiming', Component: WeatherTiming },
    { key: 'riskLevel', Component: RiskLevel },
    { key: 'thirtyDayPlan', Component: ThirtyDayPlan },
  ],
  2: [
    { key: 'fertilizerGuidance', Component: FertilizerGuidance },
    { key: 'pestPrevention', Component: PestPrevention },
    { key: 'weatherForecast', Component: WeatherForecast },
    { key: 'soilSustainability', Component: SoilSustainability },
    { key: 'waterPlanning', Component: WaterPlanning },
    { key: 'maintenancePlan', Component: MaintenancePlan },
  ],
  3: [
    { key: 'harvestReadiness', Component: HarvestReadiness },
    { key: 'bestWindow', Component: BestWindow },
    { key: 'weatherRisk', Component: WeatherRisk },
    { key: 'labourEstimate', Component: LabourEstimate },
    { key: 'costView', Component: CostView },
    { key: 'postHarvestCare', Component: PostHarvestCare },
    { key: 'harvestActionPlan', Component: HarvestActionPlan },
  ],
  4: [
    { key: 'saleReadiness', Component: SaleReadiness },
    { key: 'qualitySnapshot', Component: QualitySnapshot },
    { key: 'priceRange', Component: PriceRange },
    { key: 'historicalPrice', Component: HistoricalPrice },
    { key: 'costMargin', Component: CostMargin },
    { key: 'sellVsStore', Component: SellVsStore },
    { key: 'storagePartners', Component: StoragePartners },
    { key: 'transportOptions', Component: TransportOptions },
    { key: 'buyerVisibility', Component: BuyerVisibility },
  ],
}

function isFieldVisible(field, inputs) {
  if (!field.dependsOn) return true
  return inputs[field.dependsOn.field] === field.dependsOn.value
}

function FieldRenderer({ field, value, onChange, error }) {
  switch (field.type) {
    case 'dropdown':
      return (
        <DropdownSelect
          label={field.label}
          options={field.options}
          value={value || ''}
          onChange={v => onChange(field.name, v)}
          error={error}
        />
      )
    case 'slider':
      return (
        <SliderInput
          label={field.label}
          value={value ?? field.defaultValue ?? field.min ?? 0}
          onChange={v => onChange(field.name, v)}
          min={field.min}
          max={field.max}
          step={field.step}
          format={field.format}
          error={error}
        />
      )
    case 'toggle':
      return (
        <ToggleSwitch
          label={field.label}
          checked={value ?? field.defaultValue ?? false}
          onChange={v => onChange(field.name, v)}
          error={error}
        />
      )
    case 'multiselect':
      return (
        <MultiSelect
          label={field.label}
          options={field.options}
          value={value ?? []}
          onChange={v => onChange(field.name, v)}
          error={error}
        />
      )
    case 'text':
    default:
      return (
        <Input
          label={field.label}
          value={value || ''}
          onChange={e => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          error={error}
        />
      )
  }
}

function PhotoStep({ phaseId, phaseKey }) {
  const slots = PHOTO_SLOTS[phaseId] || []
  const { images, soilReport, addImage, addMultipleImages, removeImage, addSoilReport, clearSoilReport } = useImageUpload(phaseKey)
  const showSoilReport = phaseId === 2

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
        Upload Evidence
      </h3>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
        Add photos to help the AI analyze your crop condition. All photos are optional.
      </p>
      <PhotoUpload
        slots={slots}
        images={images}
        onAddImage={addImage}
        onAddMultiple={addMultipleImages}
        onRemoveImage={removeImage}
        soilReport={soilReport}
        onAddSoilReport={addSoilReport}
        onClearSoilReport={clearSoilReport}
        showSoilReport={showSoilReport}
      />
    </div>
  )
}

function QuestionStep({ question, inputs, onChange, validationErrors }) {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
        {question.title}
      </h3>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
        {question.subtitle}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {question.fields.map(field => {
          if (!isFieldVisible(field, inputs)) return null
          return (
            <FieldRenderer
              key={field.name}
              field={field}
              value={inputs[field.name]}
              onChange={onChange}
              error={validationErrors[field.name]}
            />
          )
        })}
      </div>
    </div>
  )
}

const LOADING_MESSAGES = {
  1: [
    'Reading your soil profile...',
    'Checking regional weather patterns...',
    'Analyzing market conditions...',
    'Comparing crop varieties...',
    'Building your recommendations...',
  ],
  2: [
    'Examining crop symptoms...',
    'Checking nutrient levels...',
    'Assessing pest risks...',
    'Planning your maintenance schedule...',
    'Preparing care guidance...',
  ],
  3: [
    'Assessing crop maturity...',
    'Analyzing weather risks...',
    'Estimating labour requirements...',
    'Planning harvest logistics...',
    'Finalizing your harvest plan...',
  ],
  4: [
    'Evaluating produce quality...',
    'Scanning current market prices...',
    'Comparing buyer channels...',
    'Calculating profit margins...',
    'Building your selling strategy...',
  ],
}

function AnalysisLoader({ phaseId }) {
  const [msgIndex, setMsgIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [slow, setSlow] = useState(false)
  const messages = LOADING_MESSAGES[phaseId] || LOADING_MESSAGES[1]

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setMsgIndex(prev => (prev + 1) % messages.length)
        setFading(false)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [messages.length])

  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 15000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '360px',
      padding: 'var(--space-12) var(--space-4)',
      gap: 'var(--space-8)',
    }}>
      <div style={{
        position: 'relative',
        width: '80px',
        height: '80px',
      }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px solid var(--color-accent)',
              animation: `rippleOut 2.4s ${i * 0.8}s var(--ease-out) infinite`,
              opacity: 0,
            }}
          />
        ))}
        <div style={{
          position: 'absolute',
          inset: '28px',
          borderRadius: '50%',
          background: 'var(--color-accent-bg)',
          border: '1.5px solid var(--color-accent)',
          animation: 'breathe 2.4s var(--ease-in-out) infinite',
        }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
          </svg>
        </div>
      </div>

      <div style={{ textAlign: 'center', minHeight: '48px' }}>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            transition: 'opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out)',
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(-6px)' : 'translateY(0)',
          }}
        >
          {messages[msgIndex]}
        </p>
        {slow && (
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-tertiary)',
              marginTop: 'var(--space-2)',
              animation: 'statusFadeIn 0.4s var(--ease-out) forwards',
            }}
          >
            This is taking longer than usual...
          </p>
        )}
      </div>
    </div>
  )
}

function formatRelativeTime(ts) {
  if (!ts) return ''
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(ts).toLocaleDateString()
}

function ResultsView({ phaseId, cards, isSubmitting, error, onReset, onRetry, historicalTimestamp, historicalName }) {
  const navigate = useNavigate()
  const resultCards = RESULT_CARD_MAP[phaseId] || []
  const quickActions = QUICK_ACTIONS[phaseId] || []
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [previousCards, setPreviousCards] = useState(() => {
    try {
      const raw = localStorage.getItem(`croppilot_prev_results_${phaseId}`)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })

  if (error) {
    return (
      <div className="glass-card" style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
        <EmptyState
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c4564a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
          title="Analysis Failed"
          description={error}
          actionLabel="Try Again"
          onAction={onRetry}
          secondaryLabel="Return to Dashboard"
          onSecondary={() => navigate('/dashboard')}
        />
      </div>
    )
  }

  if (isSubmitting) {
    return <AnalysisLoader phaseId={phaseId} />
  }

  const cardsMap = {}
  if (Array.isArray(cards)) {
    cards.forEach(card => {
      if (card && card.type) cardsMap[card.type] = card
    })
  } else if (cards && typeof cards === 'object') {
    Object.assign(cardsMap, cards)
  }

  return (
    <div>
      {historicalTimestamp && (
        <div style={{
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--color-accent-bg)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 500 }}>
            Viewing past session{historicalName ? ` — ${historicalName}` : ''} — {formatRelativeTime(historicalTimestamp)}
          </span>
        </div>
      )}

      {quickActions.length > 0 && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h4 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600,
            color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)',
          }}>
            Refine Your Results
          </h4>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
            Generate new recommendations with a different focus. Your current results will be saved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
            {pendingAction ? (
              <div className="glass-card" style={{ padding: 'var(--space-3) var(--space-4)', display: 'inline-flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Regenerate with "{pendingAction.label}"?
                </span>
                <Button variant="primary" size="sm" onClick={() => {
                  // Save current results before regenerating
                  try {
                    const prevKey = `croppilot_prev_results_${phaseId}`
                    localStorage.setItem(prevKey, JSON.stringify(cards))
                  } catch { /* ignore */ }
                  setPreviousCards(cards)
                  onRetry(pendingAction.modifier)
                  setPendingAction(null)
                }}>
                  Yes, Regenerate
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setPendingAction(null)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                {quickActions.map(action => (
                  <Button key={action.id} variant="secondary" size="sm" onClick={() => setPendingAction(action)}>
                    {action.label}
                  </Button>
                ))}
              </>
            )}
          </div>
          {previousCards && (
            <button
              onClick={() => {
                // Restore previous results - this will need the parent to handle
                onRetry('__restore_previous__')
              }}
              style={{
                marginTop: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 500,
                textDecoration: 'underline', padding: 0,
              }}
            >
              View Previous Results
            </button>
          )}
        </div>
      )}

      <div className="results-masonry">
        {resultCards.map((entry, i) => (
          <motion.div
            key={entry.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ breakInside: 'avoid', marginBottom: '16px' }}
          >
            <entry.Component data={cardsMap[entry.key]} loading={false} />
          </motion.div>
        ))}
      </div>
      <style>{`
        .results-masonry {
          column-count: 3;
          column-gap: 16px;
        }
        @media (max-width: 1024px) {
          .results-masonry { column-count: 2; }
        }
        @media (max-width: 768px) {
          .results-masonry { column-count: 1; }
        }
      `}</style>

      <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
        {showResetConfirm ? (
          <div className="glass-card" style={{ padding: 'var(--space-5)', display: 'inline-flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Start a new analysis? Current results will be cleared.</p>
            <Button variant="primary" size="sm" onClick={() => { onReset(); setShowResetConfirm(false) }}>Yes, Start New</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowResetConfirm(false)}>Cancel</Button>
          </div>
        ) : (
          <Button variant="secondary" size="md" onClick={() => setShowResetConfirm(true)}>
            Start New Session
          </Button>
        )}
      </div>
    </div>
  )
}

export default function PhasePage({ phaseId }) {
  const numId = Number(phaseId)
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    phaseConfig, inputs, cards, isSubmitting,
    questionStep, direction, totalSteps, isPhotoStep, currentQuestion,
    isLastStep, error, validationErrors, handleChange, goNext, goBack,
    handleSubmit, handleReset,
  } = usePhaseFlow(numId)

  const phaseKey = phaseConfig?.key || `phase${numId}`
  const { setPhaseCards } = useFarm()
  const sessionIdParam = searchParams.get('session')

  const [historicalTimestamp, setHistoricalTimestamp] = useState(null)
  const [historicalName, setHistoricalName] = useState('')
  const [loadingSession, setLoadingSession] = useState(!!sessionIdParam)
  const sessionFetched = useRef(false)

  // Load session from API if ?session= param present
  useEffect(() => {
    if (!sessionIdParam || !phaseKey || sessionFetched.current) return
    sessionFetched.current = true
    let cancelled = false
    getSessionById(sessionIdParam)
      .then(data => {
        if (cancelled) return
        const session = data?.session || data
        if (session?.cards) {
          setPhaseCards(phaseKey, session.cards)
          setHistoricalTimestamp(new Date(session.createdAt).getTime())
          setHistoricalName(session.sessionName || '')
        }
      })
      .catch(() => { /* session not found — show wizard */ })
      .finally(() => { if (!cancelled) setLoadingSession(false) })
    return () => { cancelled = true }
  }, [sessionIdParam, phaseKey, setPhaseCards])

  const handleAnalyze = useCallback((modifier) => {
    if (modifier === '__restore_previous__') {
      try {
        const raw = localStorage.getItem(`croppilot_prev_results_${numId}`)
        if (raw) {
          const prev = JSON.parse(raw)
          setPhaseCards(phaseKey, prev)
        }
      } catch { /* ignore */ }
      return
    }
    handleSubmit(modifier)
  }, [handleSubmit, numId, phaseKey, setPhaseCards])

  const handleResetWithCleanup = useCallback(() => {
    handleReset()
    setHistoricalTimestamp(null)
    if (searchParams.get('session')) {
      setSearchParams({}, { replace: true })
    }
  }, [handleReset, searchParams, setSearchParams])

  const hasResults = cards && (Array.isArray(cards) ? cards.length > 0 : Object.keys(cards).length > 0)
  const showResults = hasResults || isSubmitting || error

  if (loadingSession) {
    return (
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <AnalysisLoader phaseId={numId} />
      </div>
    )
  }

  if (!phaseConfig) {
    return (
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
          <EmptyState title="Phase Not Found" description="This advisory phase could not be loaded." />
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
            {phaseConfig.title}
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>
            {phaseConfig.subtitle} — Results
          </p>
        </div>
        <ResultsView
          phaseId={numId}
          cards={cards}
          isSubmitting={isSubmitting}
          error={error}
          onReset={handleResetWithCleanup}
          onRetry={handleAnalyze}
          historicalTimestamp={historicalTimestamp}
          historicalName={historicalName}
        />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
          {phaseConfig.title}
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>
          {phaseConfig.subtitle}
        </p>
      </div>

      <ProgressDots total={totalSteps} current={questionStep} style={{ marginBottom: 'var(--space-6)' }} />

      <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 40px)', overflow: 'visible' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={questionStep}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {isPhotoStep ? (
              <PhotoStep phaseId={numId} phaseKey={phaseKey} />
            ) : currentQuestion ? (
              <QuestionStep
                question={currentQuestion}
                inputs={inputs}
                onChange={handleChange}
                validationErrors={validationErrors}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)', gap: 'var(--space-3)' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            disabled={questionStep === 0}
            style={{ visibility: questionStep === 0 ? 'hidden' : 'visible', border: '1px solid var(--color-border)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </Button>

          {currentQuestion?.skippable && !isLastStep && (
            <Button variant="ghost" size="sm" onClick={() => goNext()}>
              Skip
            </Button>
          )}

          {isLastStep ? (
            <Button variant="accent" size="md" onClick={() => handleAnalyze()} loading={isSubmitting}>
              Get Results
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => goNext()}>
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
