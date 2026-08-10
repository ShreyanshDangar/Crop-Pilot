import { useCallback } from 'react'
import { useFarm } from '../context/FarmContext'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const DOC_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE = 15 * 1024 * 1024

function validateFile(file, allowedTypes) {
  if (!allowedTypes.includes(file.type)) {
    return `${file.name}: unsupported file type`
  }
  if (file.size > MAX_SIZE) {
    return `${file.name}: file exceeds 15MB limit`
  }
  return null
}

function createImageEntry(file) {
  return {
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    preview: URL.createObjectURL(file),
  }
}

export function useImageUpload(phaseKey) {
  const { phases, setPhaseImage, removePhaseImage, setSoilReport, removeSoilReport } = useFarm()
  const phaseState = phases[phaseKey] || {}
  const { images, soilReport } = phaseState

  const addImage = useCallback((index, file) => {
    const error = validateFile(file, IMAGE_TYPES)
    if (error) return error
    setPhaseImage(phaseKey, index, createImageEntry(file))
    return null
  }, [phaseKey, setPhaseImage])

  const addMultipleImages = useCallback((files) => {
    const errors = []
    const emptySlots = []
    for (let i = 0; i < 4; i++) {
      if (!images[i]) emptySlots.push(i)
    }

    let slotIdx = 0
    for (const file of Array.from(files)) {
      if (slotIdx >= emptySlots.length) break
      const error = validateFile(file, IMAGE_TYPES)
      if (error) {
        errors.push(error)
        continue
      }
      setPhaseImage(phaseKey, emptySlots[slotIdx], createImageEntry(file))
      slotIdx++
    }
    return errors
  }, [images, phaseKey, setPhaseImage])

  const handleRemoveImage = useCallback((index) => {
    removePhaseImage(phaseKey, index)
  }, [phaseKey, removePhaseImage])

  const addReport = useCallback((file) => {
    const error = validateFile(file, DOC_TYPES)
    if (error) return error
    setSoilReport(phaseKey, createImageEntry(file))
    return null
  }, [phaseKey, setSoilReport])

  const clearReport = useCallback(() => {
    removeSoilReport(phaseKey)
  }, [phaseKey, removeSoilReport])

  return {
    images,
    soilReport,
    addImage,
    addMultipleImages,
    removeImage: handleRemoveImage,
    addSoilReport: addReport,
    clearSoilReport: clearReport,
  }
}
