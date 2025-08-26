import React, {useEffect, useState} from 'react'
import {listarUsuarios, crearUsuario} from '../../services/usuariosService'

function Usuarios({children}) {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [showCreate, setShowCreate] = useState(false)
    const [creating, setCreating] = useState(false)
    const [createError, setCreateError] = useState('')

    async function fetchUsuariosMounted(setMountedLoading = true) {
        if (setMountedLoading) setLoading(true)
        setError('')
        try {
            const data = await listarUsuarios()
            setUsuarios(data)
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Error al cargar usuarios'
            setError(message)
        } finally {
            if (setMountedLoading) setLoading(false)
        }
    }

    useEffect(() => {
        let mounted = true
        ;(async () => {
            await fetchUsuariosMounted(true)
        })()
        return () => {
            mounted = false
        }
    }, [])

    async function handleCreate(payload) {
        setCreateError('')
        setCreating(true)
        try {
            await crearUsuario(payload)
            await fetchUsuariosMounted(false)
            setShowCreate(false)
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Error al crear usuario'
            setCreateError(message)
        } finally {
            setCreating(false)
        }
    }

    const api = {
        usuarios,
        loading,
        error,
        showCreate,
        setShowCreate,
        creating,
        createError,
        setCreateError,
        handleCreate,
    }

    return typeof children === 'function' ? children(api) : null
}

export default Usuarios
