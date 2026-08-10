import { get, post } from './api.js'

export function apiRegisterInit(name, email, password, confirmPassword) {
  return post('/auth/register/init', { name, email, password, confirmPassword })
}

export function apiVerifyOTP(email, otp) {
  return post('/auth/register/verify-otp', { email, otp })
}

export function apiLogin(email, password) {
  return post('/auth/login', { email, password })
}

export function apiLogout() {
  return post('/auth/logout')
}

export function apiGetMe() {
  return get('/auth/me')
}
