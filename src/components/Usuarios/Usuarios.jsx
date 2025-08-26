import React, {useEffect, useState} from 'react'
import {listarUsuarios, crearUsuario, eliminarUsuario} from '../../services/usuariosService'

function Usuarios({children}) {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [showCreate, setShowCreate] = useState(false)
    const [creating, setCreating] = useState(false)
    const [createError, setCreateError] = useState('')

    const [deletingIds, setDeletingIds] = useState([])

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

    async function handleDelete(id) {
        if (!id) return
        setError('')
        setDeletingIds((ids) => [...ids, id])
        try {
            await eliminarUsuario(id)
            await fetchUsuariosMounted(false)
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Error al eliminar usuario'
            setError(message)
        } finally {
            setDeletingIds((ids) => ids.filter((x) => x !== id))
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
        handleDelete,
        deletingIds,
    }

    return typeof children === 'function' ? children(api) : null
}

export default Usuarios
