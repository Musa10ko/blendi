// components/ErrorBoundary.tsx
'use client'
import { ReactNode, useState, useEffect } from 'react'

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      setError(event.error)
    }
    window.addEventListener('error', handler)
    return () => window.removeEventListener('error', handler)
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <p className="text-2xl font-bold text-status-danger">Oops!</p>
          <p className="text-text-secondary mt-2">{error.message}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 px-4 py-2 bg-accent-primary text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}