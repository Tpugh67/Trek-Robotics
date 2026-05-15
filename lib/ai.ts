import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export type RequestCategory = 'housekeeping' | 'room_service' | 'concierge' | 'maintenance' | 'front_desk'

export interface ParsedIntent {
  category: RequestCategory
  summary: string
  requiresStaff: boolean
  priority: 'low' | 'medium' | 'high'
}

const SYSTEM_PROMPT = `You are Trek, an elite AI concierge for a luxury hotel. Be warm, efficient, and professional. Always end your reply with <action>{"category":"concierge","summary":"request","requiresStaff":false,"priority":"low"}</action>`

export async function getAIResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  roomNumber: string
): Promise<{ reply: string; action: ParsedIntent | null }> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + '\n\nGuest room: ' + roomNumber },
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const text = completion.choices[0].message.content ?? ''
    const start = text.indexOf('<action>')
    const end = text.indexOf('</action>')
    let action: ParsedIntent | null = null
    let reply = text

    if (start !== -1 && end !== -1) {
      const json = text.slice(start + 8, end)
      try { action = JSON.parse(json) as ParsedIntent } catch { /* ignore */ }
      reply = text.slice(0, start).trim()
    }

    return { reply, action }
  } catch (err) {
    console.error('OpenAI error:', err)
    return {
      reply: "I'm having a moment — please contact the front desk directly!",
      action: null,
    }
  }
}

export function getFallbackResponse(message: string): { reply: string; action: ParsedIntent } {
  const m = message.toLowerCase()
  if (m.includes('towel') || m.includes('pillow') || m.includes('linen')) {
    return { reply: "I've dispatched housekeeping to your room. Estimated arrival: 8–10 minutes!", action: { category: 'housekeeping', summary: message, requiresStaff: true, priority: 'medium' } }
  }
  if (m.includes('food') || m.includes('room service') || m.includes('hungry') || m.includes('eat')) {
    return { reply: "Your order is with the kitchen. Estimated delivery: 25–30 minutes!", action: { category: 'room_service', summary: message, requiresStaff: true, priority: 'medium' } }
  }
  if (m.includes('pool') || m.includes('gym') || m.includes('spa')) {
    return { reply: "Pool: 6am–10pm (Floor 3), Gym: 24/7 (Floor 2), Spa: 8am–9pm (Floor 1).", action: { category: 'concierge', summary: message, requiresStaff: false, priority: 'low' } }
  }
  if (m.includes('checkout') || m.includes('late')) {
    return { reply: "Late checkout request submitted! Front desk will confirm within 15 minutes.", action: { category: 'front_desk', summary: message, requiresStaff: true, priority: 'medium' } }
  }
  if (m.includes('wifi') || m.includes('internet') || m.includes('password')) {
    return { reply: "WiFi: TrekGuest_5G | Password: Welcome2024. Speeds up to 500 Mbps!", action: { category: 'concierge', summary: message, requiresStaff: false, priority: 'low' } }
  }
  if (m.includes('broken') || m.includes('fix') || m.includes('not work')) {
    return { reply: "Maintenance ticket logged! A technician will be with you within 20 minutes.", action: { category: 'maintenance', summary: message, requiresStaff: true, priority: 'high' } }
  }
  return { reply: "Request logged! The appropriate team will assist you shortly.", action: { category: 'concierge', summary: message, requiresStaff: true, priority: 'medium' } }
}
