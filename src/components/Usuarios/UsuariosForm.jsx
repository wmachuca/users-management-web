import React, {useEffect, useState} from 'react'
import {validateEmail} from './helpers'

function UsuariosForm({onSubmit, creating, error, onClose, initialValues, mode = 'create'}) {
    const [form, setForm] = useState({correo: '', nombres: '', contrasena: '', telefono: '', apellidos: ''})
    const [localError, setLocalError] = useState('')

    useEffect(() => {
        if (initialValues && typeof initialValues === 'object') {
            const {correo = '', nombres = '', contrasena = '', telefono = '', apellidos = ''} = initialValues
            setForm({correo, nombres, contrasena, telefono, apellidos})
        }
    }, [initialValues])

    async function handleSubmit(e) {
        e.preventDefault()
        setLocalError('')

        const {correo, nombres, contrasena, telefono, apellidos} = form
        if (!correo || !validateEmail(correo)) {
            setLocalError('Ingresa un correo válido')
            return
        }
        if (!nombres) {
            setLocalError('Los nombres son obligatorios')
            return
        }
        if (mode !== 'edit' && !contrasena) {
            setLocalError('La contraseña es obligatoria')
            return
        }

        await onSubmit?.({
            correo,
            nombres,
            contrasena: mode === 'edit' && !contrasena ? undefined : contrasena,
            telefono: telefono || undefined,
            apellidos: apellidos || undefined,
        })
    }

    const submitting = !!creating
    const submitLabel = mode === 'edit' ? (submitting ? 'Actualizando…' : 'Actualizar') : (submitting ? 'Creando…' : 'Crear')

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-800 rounded bg-gray-900/60 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-300 mb-1" htmlFor="correo">Correo</label>
                    <input
                        id="correo"
                        type="email"
                        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
                        placeholder="tu@correo.com"
                        value={form.correo}
                        onChange={(e) => setForm({...form, correo: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-1" htmlFor="contrasena">Contraseña{mode === 'edit' ? ' (opcional)' : ''}</label>
                    <input
                        id="contrasena"
                        type="password"
                        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
                        placeholder="••••••••"
                        value={form.contrasena}
                        onChange={(e) => setForm({...form, contrasena: e.target.value})}
                        required={mode !== 'edit'}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-1" htmlFor="nombres">Nombres</label>
                    <input
                        id="nombres"
                        type="text"
                        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
                        placeholder="Nombres"
                        value={form.nombres}
                        onChange={(e) => setForm({...form, nombres: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-1" htmlFor="apellidos">Apellidos (opcional)</label>
                    <input
                        id="apellidos"
                        type="text"
                        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
                        placeholder="Apellidos"
                        value={form.apellidos}
                        onChange={(e) => setForm({...form, apellidos: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-1" htmlFor="telefono">Teléfono (opcional)</label>
                    <input
                        id="telefono"
                        type="text"
                        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
                        placeholder="+57 300 000 0000"
                        value={form.telefono}
                        onChange={(e) => setForm({...form, telefono: e.target.value})}
                    />
                </div>
            </div>
            {(localError || error) && <div className="text-sm text-red-400">{localError || error}</div>}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white"
                    disabled={submitting}
                >
                    {submitLabel}
                </button>
                <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </form>
    )
}

export default UsuariosForm
