'use client'

import { useState } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity/sanity.config'

export default function StudioPage() {
  const [password, setPassword] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_SANITY_ADMIN_PASSWORD) {
      setAuthorized(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  if (!authorized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h2>Enter Admin Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.5rem', marginRight: '0.5rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem' }}>Submit</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    )
  }

  return <NextStudio config={config} />
}