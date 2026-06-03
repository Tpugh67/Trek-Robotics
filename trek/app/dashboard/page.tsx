'use client'
import { useState, useEffect } from 'react'

const REQUESTS = [
  { room: '412', text: 'Extra towels + pillow', category: 'Housekeeping', status: 'in_progress', time: '2 min ago' },
  { room: '218', text: 'Late checkout request (1pm)', category: 'Front Desk', status: 'pending', time: '5 min ago' },
  { room: '307', text: 'Room service: Caesar salad', category: 'Kitchen', status: 'dispatched', time: '11 min ago' },
  { room: '501', text: 'Pool hours inquiry', category: 'AI Resolved', status: 'resolved', time: '15 min ago' },
]

const ROBOTS = [
  { unit: 'TR-01', status: 'busy', task: 'Floor 4 → Room 412', color: 'var(--tr-accent2)' },
  { unit: 'TR-02', status: 'busy', task: 'Kitchen → Room 307', color: 'var(--tr-accent2)' },
  { unit: 'TR-03', status: 'online', task: 'Lobby circuit', color: 'var(--tr-accent)' },
  { unit: 'TR-04', status: 'idle', task: 'Charging dock', color: 'var(--tr-muted)' },
]

const BARS = [
  { label: 'Housekeeping', pct: 82, color: 'var(--tr-accent)' },
  { label: 'Room Service', pct: 64, color: 'var(--tr-accent2)' },
  { label: 'Concierge', pct: 51, color: 'var(--tr-warn)' },
  { label: 'Maintenance', pct: 23, color: 'var(--tr-danger)' },
  { label: 'Front Desk', pct: 38, color: 'rgba(99,255,180,0.5)' },
]

const S: Record<string, {bg:string;color:string;label:string}> = {
  pending:     { bg: 'rgba(255,184,77,0.12)',  color: 'var(--tr-warn)',   label: 'PENDING' },
  in_progress: { bg: 'rgba(99,255,180,0.1)',   color: 'var(--tr-accent)', label: 'IN PROGRESS' },
  dispatched:  { bg: 'rgba(99,255,180,0.1)',   color: 'var(--tr-accent)', label: 'DISPATCHED' },
  resolved:    { bg: 'rgba(255,255,255,0.06)', color: 'var(--tr-muted)',  label: 'RESOLVED' },
}

export default function DashboardPage() {
  const [count, setCount] = useState(4)
  useEffect(() => {
    const t = setInterval(() => { if (Math.random() > 0.85) setCount(c => c + 1) }, 8000)
    return () => clearInterval(t)
  }, [])

  const panel = (children: React.ReactNode, title: string) => (
    <div style={{ background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 10, padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 14, color: 'var(--tr-accent)' }}>{title}</div>
      {children}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 960 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>LIVE METRICS</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Active Requests', val: String(count), sub: '↑ 2 this hour', accent: 'var(--tr-accent)' },
          { label: 'Robots Deployed', val: '3 / 5', sub: '2 idle', accent: undefined },
          { label: 'Avg Response', val: '4.2m', sub: '↓ 0.8m faster', accent: undefined },
          { label: 'Guest Score', val: '9.1', sub: '+0.3 this week', accent: 'var(--tr-warn)' },
        ].map(m => (
          <div key={m.label} style={{ background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--tr-muted)', marginBottom: 8, textTransform: 'uppercase' }}>{m.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: m.accent || 'var(--tr-text)', lineHeight: 1, marginBottom: 6 }}>{m.val}</div>
            <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'rgba(99,255,180,0.45)' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {panel(
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {REQUESTS.map(r => (
              <div key={r.room+r.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 10px', borderRadius: 7, background: 'rgba(255,255,255,0.02)', border: '0.5px solid var(--tr-border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(59,143,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--tr-accent2)', flexShrink: 0, fontFamily: 'DM Mono, monospace' }}>{r.room}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12 }}>{r.text}</div>
                  <div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>{r.time} · {r.category}</div>
                </div>
                <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', borderRadius: 8, padding: '2px 7px', background: S[r.status].bg, color: S[r.status].color, whiteSpace: 'nowrap' }}>{S[r.status].label}</span>
              </div>
            ))}
          </div>,
          'Guest Requests'
        )}

        {panel(
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ROBOTS.map(r => (
              <div key={r.unit} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, background: 'rgba(255,255,255,0.02)', border: '0.5px solid var(--tr-border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${r.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🤖</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>Unit {r.unit}</div>
                  <div style={{ fontSize: 10, color: r.color, fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', marginTop: 1 }}>{r.status}</div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--tr-muted)' }}>{r.task}</div>
              </div>
            ))}
          </div>,
          'Robot Fleet'
        )}
      </div>

      {panel(
        <div>
          {BARS.map(b => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 100, fontSize: 11, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', flexShrink: 0 }}>{b.label}</div>
              <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${b.pct}%`, height: '100%', background: b.color, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', width: 30, textAlign: 'right' }}>{b.pct}%</div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 24, marginTop: 16, paddingTop: 14, borderTop: '0.5px solid var(--tr-border)' }}>
            <div><div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>AI RESOLVED</div><div style={{ fontSize: 24, fontWeight: 700, color: 'var(--tr-accent)' }}>68%</div></div>
            <div><div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>STAFF ROUTED</div><div style={{ fontSize: 24, fontWeight: 700 }}>32%</div></div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}><div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>TOTAL TODAY</div><div style={{ fontSize: 24, fontWeight: 700 }}>147</div></div>
          </div>
        </div>,
        'Request Analytics — Today'
      )}
    </div>
  )
}
