import { get, put, del } from './api.js'

export function apiGetProfile() {
  return get('/user/profile')
}

export function apiUpdateProfile(data) {
  return put('/user/profile', data)
}

export function apiUpdatePreferences(data) {
  return put('/user/preferences', data)
}

export function apiDeleteAccount() {
  return del('/user/account')
}
