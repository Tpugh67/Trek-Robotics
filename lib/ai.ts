import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export type RequestCategory = 'housekeeping' | 'room_service' | 'concierge' | 'maintenance' | 'front_desk'

export interface ParsedIntent {
  category: RequestCategory
  summary: string
  requiresStaff: boolean
  priority: 'low' | 'medium' | 'high'
}

const SYSTEM_PROMPT = `You are Trek, an elite AI concierge for a luxury hotel. You are warm, efficient, and professional.

Your job:
1. Understand the guest's request
2. Respond helpfully and conversationally
3. At the end of your message, output a JSON block like this:
   <action>{"category":"housekeeping","summary":"Extra towels to room 412","requiresStaff":true,"priority":"medium"}</action>

Categories: housekeeping, room_service, concierge, maintenance, front_desk

Rules:
- Be concise but warm (2-3 sentences max)
- Always confirm what action you're taking
- Give realistic time estimates when dispatching
- For info questions (pool hours, wifi, etc.), answer directly and set requiresStaff: false
- For physical deliveries, set requiresStaff: true
- Always include the <action> block, no exceptions
`

export async function getAIResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  roomNumber: string
): Promise<{ reply: string; action: ParsedIntent | null }> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + `\n\nCurrent guest room: ${roomNumber}` },
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const text = completion.choices[0].message.content ?? ''

    // Parse action block
    const actionMatch = text.match(/<action>(.*?)<\/action>/s)
    let action: ParsedIntent | null = null
    let reply = text.replace(/<action>.*?<\/action>/s, '').trim()

    if (actionMatch) {
      try {
        action = JSON.parse(actionMatch[1]) as ParsedIntent
      } catch {
        // malformed JSON — ignore
      }
    }

    return { reply, action }
  } catch (err) {
    console.error('OpenAI error:', err)
    return {
      reply: "I'm having a moment — please contact the front desk directly and they'll assist you right away!",
      action: null,
    }
  }
}

// Fallback responses when AI is unavailable (demo mode)
export function getFallbackResponse(message: string): { reply: string; action: ParsedIntent } {
  const m = message.toLowerCase()

  if (m.includes('towel') || m.includes('linen') || m.includes('pillow')) {
    return {
      reply: "Of course! I've dispatched housekeeping to deliver fresh linens to your room. Estimated arrival: 8–10 minutes.",
      action: { category: 'housekeeping', summary: message, requiresStaff: true, priority: 'medium' },
    }
  }
  if (m.includes('food') || m.includes('eat') || m.includes('room service') || m.includes('hungry') || m.includes('menu')) {
    return {
      reply: "I've placed your order with the kitchen. Estimated delivery: 25–30 minutes. Our chef will prepare it fresh for you!",
      action: { category: 'room_service', summary: message, requiresStaff: true, priority: 'medium' },
    }
  }
  if (m.includes('pool') || m.includes('gym') || m.includes('spa') || m.includes('hour')) {
    return {
      reply: "The pool is open 6am–10pm (Floor 3), gym 24/7 (Floor 2), and spa 8am–9pm (Floor 1). Is there anything else I can help with?",
      action: { category: 'concierge', summary: message, requiresStaff: false, priority: 'low' },
    }
  }
  if (m.includes('checkout') || m.includes('check out') || m.includes('late')) {
    return {
      reply: "I've submitted a late checkout request for 1pm. The front desk will confirm within the next 15 minutes!",
      action: { category: 'front_desk', summary: message, requiresStaff: true, priority: 'medium' },
    }
  }
  if (m.includes('wifi') || m.includes('internet') || m.includes('password')) {
    return {
      reply: "Your WiFi network is TrekGuest_5G and the password is Welcome2024. Speeds up to 500 Mbps throughout the property!",
      action: { category: 'concierge', summary: message, requiresStaff: false, priority: 'low' },
    }
  }
  if (m.includes('broken') || m.includes('fix') || m.includes('repair') || m.includes('not work')) {
    return {
      reply: "I've logged a maintenance ticket for your room. A technician will be with you within 20 minutes!",
      action: { category: 'maintenance', summary: message, requiresStaff: true, priority: 'high' },
    }
  }
  return {
    reply: "I've logged your request and notified the appropriate team. Someone will assist you shortly — typically within 10 minutes!",
    action: { category: 'concierge', summary: message, requiresStaff: true, priority: 'medium' },
  }
}
