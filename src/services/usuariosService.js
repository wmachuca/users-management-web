import { API } from './api'
import { getSavedAuth } from './authService'

function getAuthHeader() {
  const auth = getSavedAuth()
  if (!auth || !auth.token) {
    const e = new Error('No autenticado')
    e.status = 401
    throw e
  }
  const tokenType = auth.tokenType || 'Bearer'
  return { Authorization: `${tokenType} ${auth.token}` }
}

export async function listarUsuarios() {
  const headers = getAuthHeader()
  const res = await API.get('/usuarios', { headers })
  return Array.isArray(res.data) ? res.data : []
}
