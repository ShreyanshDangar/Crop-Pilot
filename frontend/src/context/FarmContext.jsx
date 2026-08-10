import { createContext, useContext, useState, useCallback } from 'react'

const FarmContext = createContext(null)

function createPhaseState() {
  return {
    inputs: {},
    images: [null, null, null, null],
    soilReport: null,
    cards: [],
    isSubmitting: false,
    questionStep: 0,
    error: null,
  }
}

export function FarmProvider({ children }) {
  const [phases, setPhases] = useState({
    phase1: createPhaseState(),
    phase2: createPhaseState(),
    phase3: createPhaseState(),
    phase4: createPhaseState(),
  })

  const setPhaseInput = useCallback((phase, field, value) => {
    setPhases(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        inputs: { ...prev[phase].inputs, [field]: value },
      },
    }))
  }, [])

  const setPhaseInputs = useCallback((phase, inputs) => {
    setPhases(prev => ({
      ...prev,
      [phase]: { ...prev[phase], inputs },
    }))
  }, [])

  const setPhaseImage = useCallback((phase, index, image) => {
    setPhases(prev => {
      const newImages = [...prev[phase].images]
      newImages[index] = image
      return { ...prev, [phase]: { ...prev[phase], images: newImages } }
    })
  }, [])

  const removePhaseImage = useCallback((phase, index) => {
    setPhases(prev => {
      const img = prev[phase].images[index]
      if (img?.preview) URL.revokeObjectURL(img.preview)
      const newImages = [...prev[phase].images]
      newImages[index] = null
      return { ...prev, [phase]: { ...prev[phase], images: newImages } }
    })
  }, [])

  const setSoilReport = useCallback((phase, file) => {
    setPhases(prev => ({
      ...prev,
      [phase]: { ...prev[phase], soilReport: file },
    }))
  }, [])

  const removeSoilReport = useCallback((phase) => {
    setPhases(prev => {
      const sr = prev[phase].soilReport
      if (sr?.preview) URL.revokeObjectURL(sr.preview)
      return { ...prev, [phase]: { ...prev[phase], soilReport: null } }
    })
  }, [])

  const setPhaseCards = useCallback((phase, cards) => {
    setPhases(prev => ({
      ...prev,
      [phase]: { ...prev[phase], cards, error: null },
    }))
  }, [])

  const setPhaseSubmitting = useCallback((phase, value) => {
    setPhases(prev => ({
      ...prev,
      [phase]: { ...prev[phase], isSubmitting: value },
    }))
  }, [])

  const setQuestionStep = useCallback((phase, step) => {
    setPhases(prev => ({
      ...prev,
      [phase]: { ...prev[phase], questionStep: step },
    }))
  }, [])

  const setPhaseError = useCallback((phase, error) => {
    setPhases(prev => ({
      ...prev,
      [phase]: { ...prev[phase], error },
    }))
  }, [])

  const resetPhase = useCallback((phase) => {
    setPhases(prev => {
      const old = prev[phase]
      old.images.forEach(img => { if (img?.preview) URL.revokeObjectURL(img.preview) })
      if (old.soilReport?.preview) URL.revokeObjectURL(old.soilReport.preview)
      return { ...prev, [phase]: createPhaseState() }
    })
  }, [])

  return (
    <FarmContext.Provider
      value={{
        phases,
        setPhaseInput,
        setPhaseInputs,
        setPhaseImage,
        removePhaseImage,
        setSoilReport,
        removeSoilReport,
        setPhaseCards,
        setPhaseSubmitting,
        setQuestionStep,
        setPhaseError,
        resetPhase,
      }}
    >
      {children}
    </FarmContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFarm() {
  const context = useContext(FarmContext)
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider')
  }
  return context
}
