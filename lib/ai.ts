export type RequestCategory = 'housekeeping' | 'room_service' | 'concierge' | 'maintenance' | 'front_desk'

export interface ParsedIntent {
  category: RequestCategory
  summary: string
  requiresStaff: boolean
  priority: 'low' | 'medium' | 'high'
}

export function getFallbackResponse(message: string): { reply: string; action: ParsedIntent } {
  const m = message.toLowerCase()

  if (m.includes('towel') || m.includes('pillow') || m.includes('linen') || m.includes('sheet')) {
    return {
      reply: "I've dispatched housekeeping to your room. Estimated arrival: 8-10 minutes!",
      action: { category: 'housekeeping', summary: message, requiresStaff: true, priority: 'medium' },
    }
  }
  if (m.includes('food') || m.includes('room service') || m.includes('hungry') || m.includes('eat') || m.includes('menu')) {
    return {
      reply: "Your order is with the kitchen. Estimated delivery: 25-30 minutes!",
      action: { category: 'room_service', summary: message, requiresStaff: true, priority: 'medium' },
    }
  }
  if (m.includes('pool') || m.includes('gym') || m.includes('spa') || m.includes('hour') || m.includes('open')) {
    return {
      reply: "Pool: 6am-10pm (Floor 3), Gym: 24/7 (Floor 2), Spa: 8am-9pm (Floor 1). Anything else?",
      action: { category: 'concierge', summary: message, requiresStaff: false, priority: 'low' },
    }
  }
  if (m.includes('checkout') || m.includes('check out') || m.includes('late')) {
    return {
      reply: "Late checkout request submitted! Front desk will confirm within 15 minutes.",
      action: { category: 'front_desk', summary: message, requiresStaff: true, priority: 'medium' },
    }
  }
  if (m.includes('wifi') || m.includes('internet') || m.includes('password') || m.includes('network')) {
    return {
      reply: "WiFi: TrekGuest_5G | Password: Welcome2024. Speeds up to 500 Mbps!",
      action: { category: 'concierge', summary: message, requiresStaff: false, priority: 'low' },
    }
  }
  if (m.includes('broken') || m.includes('fix') || m.includes('repair') || m.includes('not work')) {
    return {
      reply: "Maintenance ticket logged! A technician will be with you within 20 minutes.",
      action: { category: 'maintenance', summary: message, requiresStaff: true, priority: 'high' },
    }
  }
  if (m.includes('taxi') || m.includes('uber') || m.includes('car') || m.includes('transport')) {
    return {
      reply: "I'll have the concierge arrange transportation for you. What time do you need it?",
      action: { category: 'concierge', summary: message, requiresStaff: true, priority: 'medium' },
    }
  }
  return {
    reply: "Request logged and the right team has been notified. They will assist you shortly!",
    action: { category: 'concierge', summary: message, requiresStaff: true, priority: 'medium' },
  }
}
