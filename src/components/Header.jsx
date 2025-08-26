import React from 'react'

function Header({isAuthenticated, onLogout, onGoHome, onGoLogin}) {
    return (
        <header className="sticky top-0 backdrop-blur bg-gray-900/60 border-b border-white/10">
            <div className="max-w-[960px] mx-auto p-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-100">Users Management</h1>
                <nav className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-gray-100" onClick={onGoHome}>Usuarios</button>
                    {isAuthenticated ? (
                        <button className="text-gray-400 hover:text-gray-100" onClick={onLogout}>Cerrar sesión</button>
                    ) : (
                        <button className="text-gray-400 hover:text-gray-100" onClick={onGoLogin}>Login</button>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
