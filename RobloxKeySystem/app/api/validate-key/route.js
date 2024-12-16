import { NextResponse } from 'next/server'

// This is a mock database of valid keys. In a real application,
// you would typically store these in a secure database.
const validKeys = new Set(['key1', 'key2', 'key3'])

export async function POST(req: Request) {
  const body = await req.json()
  const { key } = body

  const isValid = validKeys.has(key)

  return NextResponse.json({ valid: isValid })
}

