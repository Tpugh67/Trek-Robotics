'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot } from 'lucide-react'

interface Message {
  role: 'guest' | 'ai'
  content: string
  timestamp: Date
}

const QUICK_PROMPTS = [
  'I need extra towels',
  'What time does the pool close?',
  'Can I get a late checkout?',
  'Send housekeeping please',
  'What\'s the WiFi password?',
  'I\'d like to order room service',
]

const ROOM_NUMBER = '412'

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: `Welcome to Grand Hyatt! I'm Trek, your AI concierge. I can handle room requests, answer questions, and dispatch our robot fleet. How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text?: string) {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')

    const userMsg: Message = { role: 'guest', content: msg, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = messages.map(m => ({
        role: m.role === 'guest' ? 'user' : 'assistant',
        content: m.content,
      }))

      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, roomNumber: ROOM_NUMBER, history }),
      })

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', content: data.reply, timestamp: new Date() }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "I'm having a moment — please contact the front desk and they'll assist you right away!",
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', gap: 16, maxWidth: 1000 }}>
      {/* Chat panel */}
      <div style={{
        flex: 1, background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)',
        borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Chat header */}
        <div style={{ padding: '14px 18px', borderBottom: '0.5px solid var(--tr-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(99,255,180,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={16} color="var(--tr-accent)" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Trek AI Concierge</div>
            <div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--tr-accent)', display: 'inline-block' }} />
              ONLINE · ROOM {ROOM_NUMBER}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'guest' ? 'flex-end' : 'flex-start', animation: 'fadeIn 0.25s ease' }}>
              <div style={{ maxWidth: '80%' }}>
                {m.role === 'ai' && (
                  <div style={{ fontSize: 9, color: 'var(--tr-accent)', fontFamily: 'DM Mono, monospace', marginBottom: 4, letterSpacing: '0.1em' }}>TREK AI</div>
                )}
                <div style={{
                  padding: '10px 13px', borderRadius: 10, fontSize: 13, lineHeight: 1.5,
                  background: m.role === 'guest' ? 'rgba(59,143,255,0.12)' : 'rgba(99,255,180,0.06)',
                  border: `0.5px solid ${m.role === 'guest' ? 'rgba(59,143,255,0.25)' : 'var(--tr-border)'}`,
                  color: 'var(--tr-text)',
                }}>
                  {m.content}
                </div>
                <div style={{ fontSize: 9, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', marginTop: 3, textAlign: m.role === 'guest' ? 'right' : 'left' }}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '10px 13px', borderRadius: 10, background: 'rgba(99,255,180,0.06)', border: '0.5px solid var(--tr-border)', fontSize: 18, letterSpacing: 4 }}>
                <span style={{ animation: 'pulse-dot 1s infinite 0s' }}>·</span>
                <span style={{ animation: 'pulse-dot 1s infinite 0.3s' }}>·</span>
                <span style={{ animation: 'pulse-dot 1s infinite 0.6s' }}>·</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px 16px', borderTop: '0.5px solid var(--tr-border)', display: 'flex', gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a guest request..."
            style={{
              flex: 1, background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--tr-border)',
              borderRadius: 8, padding: '9px 13px', fontSize: 13, color: 'var(--tr-text)',
              fontFamily: 'Syne, sans-serif', outline: 'none',
            }}
            disabled={loading}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              background: input.trim() ? 'var(--tr-accent)' : 'rgba(99,255,180,0.1)',
              color: input.trim() ? '#0a0c12' : 'var(--tr-muted)',
              border: 'none', borderRadius: 8, padding: '9px 14px',
              cursor: input.trim() ? 'pointer' : 'default', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700,
              fontFamily: 'Syne, sans-serif',
            }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Quick prompts sidebar */}
      <div style={{
        width: 220, background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)',
        borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', marginBottom: 4 }}>Quick Requests</div>
        {QUICK_PROMPTS.map(p => (
          <button key={p} onClick={() => send(p)} style={{
            background: 'rgba(255,255,255,0.03)', border: '0.5px solid var(--tr-border)',
            borderRadius: 7, padding: '9px 11px', fontSize: 12, color: 'var(--tr-muted)',
            cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', fontFamily: 'Syne, sans-serif',
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--tr-accent)'; (e.target as HTMLElement).style.borderColor = 'rgba(99,255,180,0.3)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--tr-muted)'; (e.target as HTMLElement).style.borderColor = 'var(--tr-border)' }}
          >
            {p}
          </button>
        ))}
        <div style={{ marginTop: 'auto', padding: '12px', background: 'rgba(99,255,180,0.04)', borderRadius: 8, border: '0.5px solid rgba(99,255,180,0.15)' }}>
          <div style={{ fontSize: 10, color: 'var(--tr-accent)', fontFamily: 'DM Mono, monospace', marginBottom: 4 }}>AI STATUS</div>
          <div style={{ fontSize: 12, color: 'var(--tr-muted)' }}>GPT-powered concierge active. All requests are logged and dispatched automatically.</div>
        </div>
      </div>
    </div>
  )
}
