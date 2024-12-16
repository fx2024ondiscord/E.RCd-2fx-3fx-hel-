'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LinkvertiseRedirect() {
  const [message, setMessage] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const hash = searchParams.get('hash')
    if (hash) {
      verifyLinkvertise(hash)
    }
  }, [searchParams])

  const verifyLinkvertise = async (hash: string) => {
    try {
      const response = await fetch('/api/verify-linkvertise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash }),
      })
      const data = await response.json()
      if (data.valid) {
        setMessage(`Your key is: ${data.key}`)
      } else {
        setMessage('Invalid or expired Linkvertise verification. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    }
  }

  return message ? (
    <div className="bg-blue-100 text-blue-800 p-4 rounded mb-8">
      {message}
    </div>
  ) : null
}

