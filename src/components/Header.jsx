import React from 'react'

function Header() {
  return (
    <header className="sticky top-0 backdrop-blur bg-gray-900/60 border-b border-white/10">
      <div className="max-w-[960px] mx-auto p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-100">Users Management</h1>
        <nav>
          <a className="text-gray-400 hover:text-gray-100" href="#">Inicio</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
