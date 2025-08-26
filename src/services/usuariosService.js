import {API} from './api'
import {getSavedAuth} from './authService'

function getAuthHeader() {
    const auth = getSavedAuth()
    if (!auth || !auth.token) {
        const e = new Error('No autenticado')
        e.status = 401
        throw e
    }
    const tokenType = auth.tokenType || 'Bearer'
    return {Authorization: `${tokenType} ${auth.token}`}
}

export async function listarUsuarios() {
    const headers = getAuthHeader()
    const res = await API.get('/usuarios', {headers})
    return Array.isArray(res.data) ? res.data : []
}

export async function crearUsuario({correo, nombres, contrasena, telefono, apellidos}) {
    const headers = getAuthHeader()
    const payload = {correo, nombres, contrasena}
    if (telefono) payload.telefono = telefono
    if (apellidos) payload.apellidos = apellidos
    const res = await API.post('/usuarios', payload, {headers})
    return res.data
}

export async function actualizarUsuario(id, {correo, nombres, contrasena, telefono, apellidos}) {
    if (!id) throw new Error('ID inválido')
    const headers = getAuthHeader()
    const payload = {correo, nombres}
    if (contrasena) payload.contrasena = contrasena
    if (telefono) payload.telefono = telefono
    if (apellidos) payload.apellidos = apellidos
    const res = await API.put(`/usuarios/${id}`, payload, {headers})
    return res.data
}

export async function eliminarUsuario(id) {
    if (!id) throw new Error('ID inválido')
    const headers = getAuthHeader()
    const res = await API.delete(`/usuarios/${id}`, {headers})
    return res?.status === 200 || res?.status === 204
}
