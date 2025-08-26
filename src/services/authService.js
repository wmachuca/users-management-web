import { API } from './api'

const STORAGE_KEY = 'auth'

export function getSavedAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && parsed.expiresAt && parsed.expiresAt > Date.now() && parsed.token) {
      return parsed
    }
  } catch (_) {}
  return null
}

export function setAuth(auth) {
  if (!auth) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated() {
  return !!getSavedAuth()
}

export async function login({ correo, contrasena }) {
  try {
    const res = await API.post('/auth/login', { correo, contrasena })
    const data = res.data
    const expiresAt = Date.now() + (data?.expiresInSeconds ?? 0) * 1000
    const authData = {
      token: data?.token,
      tokenType: data?.tokenType || 'Bearer',
      expiresInSeconds: data?.expiresInSeconds ?? 0,
      expiresAt,
      correo,
    }
    setAuth(authData)
    return authData
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || 'Error al iniciar sesión'
    const e = new Error(message)
    e.status = err?.response?.status
    throw e
  }
}
