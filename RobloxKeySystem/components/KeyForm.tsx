'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function KeyForm() {
  const [key, setKey] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/validate-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    })
    const data = await response.json()
    setResult(data.valid ? 'Valid key! You can now use this in your Roblox game.' : 'Invalid key. Please complete the Linkvertise step first.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mt-8">
      <Input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter your key"
        required
      />
      <Button type="submit" className="w-full">
        Validate Key
      </Button>
      {result && (
        <div className={`text-center p-2 rounded ${result.includes('Valid key!') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result}
        </div>
      )}
    </form>
  )
}

