import { get, post, del } from './api.js'

function buildFormData(inputs, images, soilReport, modifier) {
  const formData = new FormData()
  formData.append('inputs', JSON.stringify(inputs))
  if (modifier) formData.append('modifier', modifier)
  images.forEach((img, idx) => {
    if (img && img.file) formData.append(`image_${idx}`, img.file)
  })
  if (soilReport && soilReport.file) formData.append('soilReport', soilReport.file)
  return formData
}

export function analyzePhase1({ inputs, modifier }) {
  return post('/farm/phase1/analyze', { inputs, modifier })
}

export function analyzePhase2({ inputs, images = [], soilReport, modifier }) {
  const hasFiles = images.some(img => img !== null) || soilReport
  if (hasFiles) {
    const formData = buildFormData(inputs, images, soilReport, modifier)
    return fetch(`${import.meta.env.VITE_API_URL}/api/farm/phase2/analyze`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then(handleResponse)
  }
  return post('/farm/phase2/analyze', { inputs, modifier })
}

export function analyzePhase3({ inputs, images = [], modifier }) {
  const hasFiles = images.some(img => img !== null)
  if (hasFiles) {
    const formData = buildFormData(inputs, images, null, modifier)
    return fetch(`${import.meta.env.VITE_API_URL}/api/farm/phase3/analyze`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then(handleResponse)
  }
  return post('/farm/phase3/analyze', { inputs, modifier })
}

export function analyzePhase4({ inputs, images = [], modifier }) {
  const hasFiles = images.some(img => img !== null)
  if (hasFiles) {
    const formData = buildFormData(inputs, images, null, modifier)
    return fetch(`${import.meta.env.VITE_API_URL}/api/farm/phase4/analyze`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then(handleResponse)
  }
  return post('/farm/phase4/analyze', { inputs, modifier })
}

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) {
    const error = new Error(data.message || 'Something went wrong')
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}

export function getSessions() {
  return get('/farm/sessions')
}

export function getSessionById(id) {
  return get(`/farm/sessions/${id}`)
}

export function deleteSessionById(id) {
  return del(`/farm/sessions/${id}`)
}

export function getStats() {
  return get('/farm/stats')
}
