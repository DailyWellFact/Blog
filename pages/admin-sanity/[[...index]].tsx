// /pages/admin-sanity/[[...index]].tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity/sanity.config'

export default function AdminStudioPage() {
  return (
    <div style={{ height: '100vh' }}>
      {/* Optional logout button for convenience */}
      {/* 
      You can skip this if you rely purely on Vercel password protection
      Logout would just be closing the browser or clearing credentials
      */}
      <NextStudio config={config} />
    </div>
  )
}