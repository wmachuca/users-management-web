import React from 'react'
import {formatDate} from './helpers'

function UsuariosTable({usuarios}) {
    if (!Array.isArray(usuarios) || usuarios.length === 0) return null
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
    )
}

export default UsuariosTable
