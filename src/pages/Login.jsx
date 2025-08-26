import React, { useState } from 'react'
import { getApiBaseUrl } from '../services/api'
import { login as loginService } from '../services/authService'

function Login({ onSuccess }) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!correo || !contrasena) {
      setError('Por favor ingresa correo y contraseña')
      return
    }
    setLoading(true)
    try {
      const authData = await loginService({ correo, contrasena })
      onSuccess?.(authData)
    } catch (err) {
      setError(err?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-[420px] mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Iniciar sesión</h2>
      <p className="text-sm text-gray-400 mb-6">Servidor: {getApiBaseUrl()}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1" htmlFor="correo">Correo</label>
          <input
            id="correo"
            type="email"
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
            placeholder="tu@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1" htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
            placeholder="••••••••"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error && (
          <div className="text-sm text-red-400">{error}</div>
        )}
        <button
          type="submit"
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium"
          disabled={loading}
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </section>
  )
}

export default Login
