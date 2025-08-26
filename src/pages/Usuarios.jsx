import React, { useEffect, useState } from 'react'
import { listarUsuarios } from '../services/usuariosService'

function formatDate(iso) {
  try {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleString()
  } catch (_) {
    return iso
  }
}

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function fetchUsuarios() {
      setLoading(true)
      setError('')
      try {
        const data = await listarUsuarios()
        if (!mounted) return
        setUsuarios(data)
      } catch (err) {
        if (!mounted) return
        const message = err?.response?.data?.message || err?.message || 'Error al cargar usuarios'
        setError(message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchUsuarios()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>
      {loading && <div className="text-gray-400">Cargando…</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && usuarios.length === 0 && (
        <div className="text-gray-400">No hay usuarios para mostrar.</div>
      )}
      {!loading && !error && usuarios.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-2 border-b border-gray-700">Correo</th>
                <th className="px-3 py-2 border-b border-gray-700">Teléfono</th>
                <th className="px-3 py-2 border-b border-gray-700">Nombres</th>
                <th className="px-3 py-2 border-b border-gray-700">Apellidos</th>
                <th className="px-3 py-2 border-b border-gray-700">Creado</th>
                <th className="px-3 py-2 border-b border-gray-700">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id} className="odd:bg-gray-900 even:bg-gray-800/40">
                  <td className="px-3 py-2 border-b border-gray-800 align-top">{u.correo}</td>
                  <td className="px-3 py-2 border-b border-gray-800 align-top">{u.telefono}</td>
                  <td className="px-3 py-2 border-b border-gray-800 align-top">{u.nombres}</td>
                  <td className="px-3 py-2 border-b border-gray-800 align-top">{u.apellidos}</td>
                  <td className="px-3 py-2 border-b border-gray-800 align-top">{formatDate(u.fechaCreacion)}</td>
                  <td className="px-3 py-2 border-b border-gray-800 align-top">{formatDate(u.fechaActualizacion)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Usuarios
