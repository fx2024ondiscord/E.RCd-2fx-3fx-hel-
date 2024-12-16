import { NextResponse } from 'next/server'

const LINKVERTISE_TOKEN = '12cfd687bc39171533f0eb5b0d9bbf708412cb62502693cb8b15ca39d81777c9'

export async function POST(req: Request) {
  const body = await req.json()
  const { hash } = body

  try {
    const response = await fetch(`https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${LINKVERTISE_TOKEN}&hash=${hash}`, {
      method: 'POST',
    })

    if (response.ok) {
      const result = await response.text()
      if (result === 'TRUE') {
        // Generate a unique key for the user
        const key = generateUniqueKey()
        // In a real application, you would save this key to your database
        return NextResponse.json({ valid: true, key })
      }
    }

    return NextResponse.json({ valid: false })
  } catch (error) {
    console.error('Error verifying Linkvertise:', error)
    return NextResponse.json({ valid: false })
  }
}

function generateUniqueKey() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

