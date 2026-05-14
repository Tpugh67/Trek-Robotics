import { NextRequest, NextResponse } from 'next/server'
import { getAIResponse, getFallbackResponse } from '@/lib/ai'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { message, roomNumber, history } = await req.json()

    if (!message || !roomNumber) {
      return NextResponse.json({ error: 'message and roomNumber required' }, { status: 400 })
    }

    // Build messages array for OpenAI
    const messages = [
      ...(history || []),
      { role: 'user' as const, content: message },
    ]

    let reply: string
    let action: ReturnType<typeof getFallbackResponse>['action'] | null

    // Try OpenAI — fall back to local logic
    if (process.env.OPENAI_API_KEY) {
      const result = await getAIResponse(messages, roomNumber)
      reply = result.reply
      action = result.action
    } else {
      const fallback = getFallbackResponse(message)
      reply = fallback.reply
      action = fallback.action
    }

    // Persist guest message to Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase.from('chat_messages').insert([
        { room_number: roomNumber, role: 'guest', content: message },
        { room_number: roomNumber, role: 'ai', content: reply },
      ])

      // Create a request ticket if staff needed
      if (action?.requiresStaff) {
        await supabase.from('guest_requests').insert([{
          room_number: roomNumber,
          message: action.summary || message,
          category: action.category,
          status: 'pending',
          ai_handled: true,
        }])
      }
    }

    return NextResponse.json({ reply, action })
  } catch (err) {
    console.error('Concierge API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
