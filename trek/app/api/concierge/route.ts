import { NextRequest, NextResponse } from 'next/server'
import { getFallbackResponse } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { message, roomNumber } = await req.json()
    if (!message || !roomNumber) {
      return NextResponse.json({ error: 'message and roomNumber required' }, { status: 400 })
    }
    const { reply, action } = getFallbackResponse(message)
    return NextResponse.json({ reply, action })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
