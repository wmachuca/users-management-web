import React from 'react'
import {formatDate} from './helpers'

function UsuariosTable({usuarios, onDelete, deletingIds = [], onEdit}) {
    if (!Array.isArray(usuarios) || usuarios.length === 0) return null
    const isDeleting = (id) => Array.isArray(deletingIds) && deletingIds.includes(id)

    function confirmAndDelete(id, correo) {
        if (!onDelete) return
        const ok = window.confirm(`¿Seguro que deseas eliminar al usuario ${correo || ''}?`)
        if (ok) onDelete(id)
    }

    return (
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
                    <th className="px-3 py-2 border-b border-gray-700 text-right">Acciones</th>
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
                        <td className="px-3 py-2 border-b border-gray-800 align-top text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-sm"
                                    onClick={() => onEdit?.(u)}
                                    title="Editar usuario"
                                    aria-label={`Editar ${u.correo}`}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm"
                                    onClick={() => confirmAndDelete(u.id, u.correo)}
                                    disabled={isDeleting(u.id)}
                                    title={isDeleting(u.id) ? 'Eliminando…' : 'Eliminar usuario'}
                                    aria-label={`Eliminar ${u.correo}`}
                                >
                                    {isDeleting(u.id) ? 'Eliminando…' : 'Eliminar'}
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsuariosTable
