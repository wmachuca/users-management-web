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
                      handleCreate
                  }) => (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold">Usuarios</h2>
                            <button
                                className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
                                onClick={() => setShowCreate((v) => !v)}
                            >
                                {showCreate ? 'Cancelar' : 'Crear usuario'}
                            </button>
                        </div>

                        {showCreate && (
                            <UsuariosForm
                                onSubmit={handleCreate}
                                creating={creating}
                                error={createError}
                                onClose={() => {
                                    setShowCreate(false);
                                    setCreateError('')
                                }}
                            />
                        )}

                        {loading && <div className="text-gray-400">Cargando…</div>}
                        {error && <div className="text-red-400">{error}</div>}
                        {!loading && !error && usuarios.length === 0 && (
                            <div className="text-gray-400">No hay usuarios para mostrar.</div>
                        )}
                        {!loading && !error && usuarios.length > 0 && (
                            <UsuariosTable usuarios={usuarios}/>
                        )}
                    </>
                )}
            </UsuariosOrchestrator>
        </section>
    )
}

export default UsuariosPage
