const BASE_URL = import.meta.env.VITE_API_URL

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}/api${endpoint}`

  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (options.body instanceof FormData) {
    delete config.headers['Content-Type']
  }

  const res = await fetch(url, config)

  if (res.redirected) {
    window.location.href = res.url
    return null
  }

  if (res.status === 204) {
    return { status: 'success' }
  }

  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()

  let data
  if (contentType.includes('application/json') && text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: 'Invalid response from server' }
    }
  } else if (text) {
    data = { message: text }
  } else {
    data = { message: `Request failed with status ${res.status}` }
  }

  if (!res.ok) {
    const error = new Error(data.message || 'Something went wrong')
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}

export function get(endpoint) {
  return request(endpoint, { method: 'GET' })
}

export function post(endpoint, body) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function put(endpoint, body) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function del(endpoint) {
  return request(endpoint, { method: 'DELETE' })
}
