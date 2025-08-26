import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import Usuarios from './pages/Usuarios'
import Login from './pages/Login'
import { getSavedAuth, clearAuth } from './services/authService'

function App() {
  const [auth, setAuth] = useState(getSavedAuth())
  const isAuthenticated = !!auth
  const [view, setView] = useState(isAuthenticated ? 'home' : 'login')

  function handleLogout() {
    clearAuth()
    setAuth(null)
    setView('login')
  }

  const content = useMemo(() => {
    if (!isAuthenticated) return <Login onSuccess={(a) => { setAuth(a); setView('home') }} />
    return view === 'login' ? <Login onSuccess={(a) => { setAuth(a); setView('home') }} /> : <Usuarios />
  }, [isAuthenticated, view])

  return (
    <div className="app min-h-screen bg-gray-900 text-gray-100">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onGoHome={() => setView('home')}
        onGoLogin={() => setView('login')}
      />
      <main className="max-w-[960px] mx-auto p-4">
        {content}
      </main>
    </div>
  )
}

export default App
