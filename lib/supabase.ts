import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type RequestStatus = 'pending' | 'in_progress' | 'dispatched' | 'resolved'
export type RequestCategory = 'housekeeping' | 'room_service' | 'concierge' | 'maintenance' | 'front_desk'

export interface GuestRequest {
  id: string
  room_number: string
  message: string
  category: RequestCategory
  status: RequestStatus
  ai_handled: boolean
  created_at: string
  updated_at: string
}

export interface Robot {
  id: string
  unit_id: string
  status: 'online' | 'busy' | 'idle' | 'charging' | 'offline'
  current_task: string | null
  location: string | null
  battery: number
  updated_at: string
}

export interface ChatMessage {
  id: string
  room_number: string
  role: 'guest' | 'ai'
  content: string
  created_at: string
}
