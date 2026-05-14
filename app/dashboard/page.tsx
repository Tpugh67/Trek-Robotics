'use client'
import { useEffect, useState } from 'react'
import { TrendingUp, Clock, Star, Activity } from 'lucide-react'

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

const ANALYTICS = [
  { label: 'Housekeeping', pct: 82, color: 'var(--tr-accent)' },
  { label: 'Room Service', pct: 64, color: 'var(--tr-accent2)' },
  { label: 'Concierge', pct: 51, color: 'var(--tr-warn)' },
  { label: 'Maintenance', pct: 23, color: 'var(--tr-danger)' },
  { label: 'Front Desk', pct: 38, color: 'rgba(99,255,180,0.5)' },
]

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  pending:     { bg: 'rgba(255,184,77,0.12)',  color: 'var(--tr-warn)',   label: 'PENDING' },
  in_progress: { bg: 'rgba(99,255,180,0.1)',   color: 'var(--tr-accent)', label: 'IN PROGRESS' },
  dispatched:  { bg: 'rgba(99,255,180,0.1)',   color: 'var(--tr-accent)', label: 'DISPATCHED' },
  resolved:    { bg: 'rgba(255,255,255,0.06)', color: 'var(--tr-muted)',  label: 'RESOLVED' },
}

function MetricCard({ icon: Icon, label, value, sub, accentColor }: {
  icon: React.ElementType; label: string; value: string; sub: string; accentColor?: string
}) {
  return (
    <div style={{ background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 10, padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--tr-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        <Icon size={14} color={accentColor || 'var(--tr-muted)'} />
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: accentColor || 'var(--tr-text)', lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'rgba(99,255,180,0.45)' }}>{sub}</div>
    </div>
  )
}

export default function DashboardPage() {
  const [reqCount, setReqCount] = useState(4)

  // Simulate live ticking request count
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.85) setReqCount(c => c + 1)
    }, 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 960 }}>
      {/* Section label */}
      <div style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase' }}>Live metrics</div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <MetricCard icon={Activity} label="Active Requests" value={String(reqCount)} sub="↑ 2 this hour" accentColor="var(--tr-accent)" />
        <MetricCard icon={TrendingUp} label="Robots Deployed" value="3 / 5" sub="2 idle" />
        <MetricCard icon={Clock} label="Avg Response" value="4.2m" sub="↓ 0.8m faster" />
        <MetricCard icon={Star} label="Guest Score" value="9.1" sub="+0.3 this week" accentColor="var(--tr-warn)" />
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Requests */}
        <div style={{ background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 14, color: 'var(--tr-accent)' }}>Guest Requests</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {REQUESTS.map(r => {
              const s = statusStyle[r.status]
              return (
                <div key={r.room + r.text} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 10px',
                  borderRadius: 7, background: 'rgba(255,255,255,0.02)', border: '0.5px solid var(--tr-border)',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(59,143,255,0.15)', border: '0.5px solid rgba(59,143,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: 'var(--tr-accent2)', flexShrink: 0, fontFamily: 'DM Mono, monospace',
                  }}>{r.room}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, lineHeight: 1.3 }}>{r.text}</div>
                    <div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>{r.time} · {r.category}</div>
                  </div>
                  <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', borderRadius: 8, padding: '2px 7px', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Fleet */}
        <div style={{ background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 14, color: 'var(--tr-accent)' }}>Robot Fleet</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ROBOTS.map(r => (
              <div key={r.unit} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                borderRadius: 7, background: 'rgba(255,255,255,0.02)', border: '0.5px solid var(--tr-border)',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: `${r.color}1a`, border: `0.5px solid ${r.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0,
                }}>🤖</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>Unit {r.unit}</div>
                  <div style={{ fontSize: 10, color: r.color, fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', marginTop: 1 }}>{r.status}</div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--tr-muted)', textAlign: 'right' }}>{r.task}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div style={{ background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 14, color: 'var(--tr-accent)' }}>Request Analytics — Today</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ANALYTICS.map(a => (
            <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 100, fontSize: 11, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace', flexShrink: 0 }}>{a.label}</div>
              <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${a.pct}%`, height: '100%', background: a.color, borderRadius: 3, transition: 'width 0.8s ease' }} />
              </div>
              <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--tr-text)', width: 30, textAlign: 'right' }}>{a.pct}%</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 16, paddingTop: 14, borderTop: '0.5px solid var(--tr-border)' }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>AI RESOLVED</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--tr-accent)' }}>68%</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>STAFF ROUTED</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>32%</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>TOTAL TODAY</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>147</div>
          </div>
        </div>
      </div>
    </div>
  )
}
