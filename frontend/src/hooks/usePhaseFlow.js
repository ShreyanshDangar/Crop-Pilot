import { useState, useCallback, useMemo } from 'react'
import { useFarm } from '../context/FarmContext'
import { PHASES, PHASE_QUESTIONS } from '../config/phases'
import { analyzePhase1, analyzePhase2, analyzePhase3, analyzePhase4 } from '../services/farmService'

const analyzeFns = { 1: analyzePhase1, 2: analyzePhase2, 3: analyzePhase3, 4: analyzePhase4 }
const AI_FALLBACK_MESSAGE = 'To enable AI features, add your Claude API key to the `.env` file as `CLAUDE_API_KEY`.'

function getFieldValue(field, values) {
  const val = values[field.name]
  if (val !== undefined) return val
  if (field.type === 'slider') return field.defaultValue ?? field.min ?? 0
  if (field.type === 'toggle') return field.defaultValue ?? false
  if (field.type === 'multiselect') return field.defaultValue ?? []
  return ''
}

function isFieldVisible(field, values) {
  if (!field.dependsOn) return true
  return values[field.dependsOn.field] === field.dependsOn.value
}

function validateQuestion(question, values) {
  const errors = {}
  for (const field of question.fields) {
    if (!field.required) continue
    if (!isFieldVisible(field, values)) continue
    const val = getFieldValue(field, values)
    if (field.type === 'multiselect') {
      if (!Array.isArray(val) || val.length === 0) errors[field.name] = `${field.label} is required`
    } else if (val === '' || val === undefined || val === null) {
      errors[field.name] = `${field.label} is required`
    }
  }
  return errors
}

function resolveInputs(questions, values) {
  const resolved = { ...values }
  for (const q of questions) {
    for (const field of q.fields) {
      if (field.dependsOn && !isFieldVisible(field, values)) {
        delete resolved[field.name]
        continue
      }
      if (resolved[field.name] === undefined || resolved[field.name] === '') {
        if (field.type === 'slider') resolved[field.name] = field.defaultValue ?? field.min ?? 0
        else if (field.type === 'toggle') resolved[field.name] = field.defaultValue ?? false
        else if (field.type === 'multiselect') resolved[field.name] = []
      }
    }
  }
  return resolved
}

export function usePhaseFlow(phaseId) {
  const numId = Number(phaseId)
  const {
    phases, setPhaseInput, setPhaseInputs, setPhaseCards,
    setPhaseSubmitting, setQuestionStep, setPhaseError, resetPhase,
  } = useFarm()

  const phaseConfig = useMemo(() => PHASES.find(p => p.id === numId), [numId])
  const questions = useMemo(() => PHASE_QUESTIONS[numId] || [], [numId])
  const phaseKey = phaseConfig?.key || `phase${numId}`
  const phaseState = phases[phaseKey] || {}

  const { inputs, images, soilReport, cards, isSubmitting, questionStep, error } = phaseState
  const [direction, setDirection] = useState(1)
  const [validationErrors, setValidationErrors] = useState({})

  const totalSteps = phaseConfig?.hasPhotos ? questions.length + 1 : questions.length
  const isPhotoStep = phaseConfig?.hasPhotos && questionStep === 0
  const questionIndex = phaseConfig?.hasPhotos ? questionStep - 1 : questionStep
  const currentQuestion = isPhotoStep ? null : questions[questionIndex]
  const isLastStep = questionStep === totalSteps - 1

  const handleChange = useCallback((field, value) => {
    setPhaseInput(phaseKey, field, value)
    setValidationErrors(prev => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [phaseKey, setPhaseInput])

  const goNext = useCallback(() => {
    if (isPhotoStep) {
      setDirection(1)
      setQuestionStep(phaseKey, questionStep + 1)
      return true
    }
    if (currentQuestion) {
      const errs = validateQuestion(currentQuestion, inputs)
      if (Object.keys(errs).length > 0) {
        setValidationErrors(errs)
        return false
      }
    }
    setValidationErrors({})
    setDirection(1)
    setQuestionStep(phaseKey, questionStep + 1)
    return true
  }, [isPhotoStep, currentQuestion, inputs, phaseKey, questionStep, setQuestionStep])

  const goBack = useCallback(() => {
    if (questionStep > 0) {
      setDirection(-1)
      setQuestionStep(phaseKey, questionStep - 1)
    }
  }, [questionStep, phaseKey, setQuestionStep])

  const handleSubmit = useCallback(async (modifier) => {
    // Validate all questions
    for (let i = 0; i < questions.length; i++) {
      const errs = validateQuestion(questions[i], inputs)
      if (Object.keys(errs).length > 0) {
        const targetStep = phaseConfig?.hasPhotos ? i + 1 : i
        setQuestionStep(phaseKey, targetStep)
        setValidationErrors(errs)
        return
      }
    }

    setPhaseSubmitting(phaseKey, true)
    setPhaseError(phaseKey, null)

    const resolved = resolveInputs(questions, inputs)
    setPhaseInputs(phaseKey, resolved)

    try {
      const analyzeFn = analyzeFns[numId]
      const payload = { inputs: resolved, modifier }
      if (numId >= 2) {
        payload.images = images
        if (numId === 2) payload.soilReport = soilReport
      }
      const data = await analyzeFn(payload)
      setPhaseCards(phaseKey, data.cards)
    } catch {
      setPhaseError(phaseKey, AI_FALLBACK_MESSAGE)
    } finally {
      setPhaseSubmitting(phaseKey, false)
    }
  }, [questions, inputs, phaseConfig, phaseKey, numId, images, soilReport,
      setPhaseSubmitting, setPhaseError, setPhaseInputs, setPhaseCards, setQuestionStep])

  const handleReset = useCallback(() => {
    resetPhase(phaseKey)
  }, [phaseKey, resetPhase])

  return {
    phaseConfig,
    questions,
    inputs,
    images,
    soilReport,
    cards,
    isSubmitting,
    questionStep,
    direction,
    totalSteps,
    isPhotoStep,
    currentQuestion,
    isLastStep,
    questionIndex,
    error,
    validationErrors,
    handleChange,
    goNext,
    goBack,
    handleSubmit,
    handleReset,
  }
}
