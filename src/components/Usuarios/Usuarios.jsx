import React, {useEffect, useState} from 'react'
import {listarUsuarios, crearUsuario, eliminarUsuario, actualizarUsuario} from '../../services/usuariosService'

function Usuarios({children}) {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [showCreate, setShowCreate] = useState(false)
    const [creating, setCreating] = useState(false)
    const [createError, setCreateError] = useState('')

    const [editingUser, setEditingUser] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState('')

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

    function startEdit(user) {
        setUpdateError('')
        setEditingUser(user || null)
        setShowCreate(false)
    }

    function cancelEdit() {
        setUpdateError('')
        setEditingUser(null)
    }

    async function handleUpdate(payload) {
        if (!editingUser?.id) return
        setUpdateError('')
        setUpdating(true)
        try {
            await actualizarUsuario(editingUser.id, payload)
            await fetchUsuariosMounted(false)
            setEditingUser(null)
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Error al actualizar usuario'
            setUpdateError(message)
        } finally {
            setUpdating(false)
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
        editingUser,
        updating,
        updateError,
        startEdit,
        cancelEdit,
        handleUpdate,
        handleDelete,
        deletingIds,
    }

    return typeof children === 'function' ? children(api) : null
}

export default Usuarios
