import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity/sanity.config'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import { useState } from 'react'

export default function StudioPage() {
  const [passwordInput, setPasswordInput] = useState('')
  const [error, setError] = useState('')

  // Check cookie
  const authorized = getCookie('sanity_auth') === process.env.NEXT_PUBLIC_SANITY_ADMIN_PASSWORD

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === process.env.NEXT_PUBLIC_SANITY_ADMIN_PASSWORD) {
      setCookie('sanity_auth', passwordInput, { path: '/' })
      window.location.reload() // reload to render Studio
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    deleteCookie('sanity_auth', { path: '/' })
    window.location.reload()
  }

  if (!authorized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h2>Enter Admin Password</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ padding: '0.5rem', marginRight: '0.5rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem' }}>Submit</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    )
  }

  return (
    <div style={{ height: '100vh' }}>
      {/* Logout button */}
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#b91c1c',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <NextStudio config={config} />
    </div>
  )
}