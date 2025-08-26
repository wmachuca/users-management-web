import React from 'react'
import UsuariosOrchestrator from '../components/Usuarios/Usuarios'
import UsuariosForm from '../components/Usuarios/UsuariosForm'
import UsuariosTable from '../components/Usuarios/UsuariosTable'

function UsuariosPage() {
    return (
        <section>
            <UsuariosOrchestrator>
                {({
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
                  }) => (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold">Usuarios</h2>
                            <div className="flex items-center gap-2">
                                {editingUser ? (
                                    <button
                                        className="px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white text-sm"
                                        onClick={cancelEdit}
                                    >
                                        Cancelar edición
                                    </button>
                                ) : (
                                    <button
                                        className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
                                        onClick={() => setShowCreate((v) => !v)}
                                    >
                                        {showCreate ? 'Cancelar' : 'Crear usuario'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {(showCreate || editingUser) && (
                            <UsuariosForm
                                onSubmit={editingUser ? handleUpdate : handleCreate}
                                creating={editingUser ? updating : creating}
                                error={editingUser ? updateError : createError}
                                onClose={() => {
                                    if (editingUser) {
                                        cancelEdit()
                                    } else {
                                        setShowCreate(false)
                                        setCreateError('')
                                    }
                                }}
                                initialValues={editingUser ? {
                                    correo: editingUser.correo || '',
                                    nombres: editingUser.nombres || '',
                                    contrasena: '',
                                    telefono: editingUser.telefono || '',
                                    apellidos: editingUser.apellidos || '',
                                } : undefined}
                                mode={editingUser ? 'edit' : 'create'}
                            />
                        )}

                        {loading && <div className="text-gray-400">Cargando…</div>}
                        {error && <div className="text-red-400">{error}</div>}
                        {!loading && !error && usuarios.length === 0 && (
                            <div className="text-gray-400">No hay usuarios para mostrar.</div>
                        )}
                        {!loading && !error && usuarios.length > 0 && (
                            <UsuariosTable usuarios={usuarios} onDelete={handleDelete} deletingIds={deletingIds} onEdit={startEdit}/>
                        )}
                    </>
                )}
            </UsuariosOrchestrator>
        </section>
    )
}

export default UsuariosPage
