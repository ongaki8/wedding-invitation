// app/api/pin/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { pin } = await request.json()
  
  const correctPin = process.env.WEDDING_PIN
  
  if (!correctPin) {
    return NextResponse.json(
      { error: 'PIN verification not configured' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    isValid: pin === correctPin
  })
}