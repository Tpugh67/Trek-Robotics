'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot } from 'lucide-react'

interface Msg { role: 'guest' | 'ai'; content: string; time: Date }

const QUICK = ['I need extra towels', 'What time does the pool close?', 'Can I get a late checkout?', "What's the WiFi password?", 'Send housekeeping please', 'I want to order room service']

export default function ConciergePage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', content: "Welcome! I'm Trek, your AI concierge. I can handle room requests, answer questions, and dispatch our robot fleet. How can I help?", time: new Date() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottom = useRef<HTMLDivElement>(null)

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send(text?: string) {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'guest', content: msg, time: new Date() }])
    setLoading(true)
    try {
      const res = await fetch('/api/concierge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, roomNumber: '412' }) })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', content: data.reply, time: new Date() }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having a moment — please contact the front desk!", time: new Date() }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', gap: 16, maxWidth: 1000 }}>
      <div style={{ flex: 1, background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '0.5px solid var(--tr-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(99,255,180,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={16} color="var(--tr-accent)" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Trek AI Concierge</div>
            <div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>ONLINE · ROOM 412</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'guest' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%' }}>
                {m.role === 'ai' && <div style={{ fontSize: 9, color: 'var(--tr-accent)', fontFamily: 'DM Mono, monospace', marginBottom: 4, letterSpacing: '0.1em' }}>TREK AI</div>}
                <div style={{ padding: '10px 13px', borderRadius: 10, fontSize: 13, lineHeight: 1.5, background: m.role === 'guest' ? 'rgba(59,143,255,0.12)' : 'rgba(99,255,180,0.06)', border: `0.5px solid ${m.role === 'guest' ? 'rgba(59,143,255,0.25)' : 'var(--tr-border)'}` }}>
                  {m.content}
                </div>
                <div style={{ fontSize: 9, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', marginTop: 3, textAlign: m.role === 'guest' ? 'right' : 'left' }}>
                  {m.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ padding: '10px 13px', borderRadius: 10, background: 'rgba(99,255,180,0.06)', border: '0.5px solid var(--tr-border)', fontSize: 18, letterSpacing: 4, width: 'fit-content' }}>···</div>
          )}
          <div ref={bottom} />
        </div>

        <div style={{ padding: '12px 16px', borderTop: '0.5px solid var(--tr-border)', display: 'flex', gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a guest request..." disabled={loading}
            style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--tr-border)', borderRadius: 8, padding: '9px 13px', fontSize: 13, color: 'var(--tr-text)', fontFamily: 'Syne, sans-serif', outline: 'none' }} />
          <button onClick={() => send()} disabled={loading || !input.trim()}
            style={{ background: input.trim() ? 'var(--tr-accent)' : 'rgba(99,255,180,0.1)', color: input.trim() ? '#0a0c12' : 'var(--tr-muted)', border: 'none', borderRadius: 8, padding: '9px 14px', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}>
            <Send size={14} />
          </button>
        </div>
      </div>

      <div style={{ width: 220, background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', marginBottom: 4 }}>Quick Requests</div>
        {QUICK.map(p => (
          <button key={p} onClick={() => send(p)} style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid var(--tr-border)', borderRadius: 7, padding: '9px 11px', fontSize: 12, color: 'var(--tr-muted)', cursor: 'pointer', textAlign: 'left', fontFamily: 'Syne, sans-serif' }}>
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
