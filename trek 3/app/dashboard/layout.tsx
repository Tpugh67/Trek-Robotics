import Sidebar from '@/components/dashboard/Sidebar'
import { Bot } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--tr-bg)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '0.5px solid var(--tr-border)', flexShrink: 0 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--tr-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={16} color="#0a0c12" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.06em', color: 'var(--tr-text)' }}>TREK <span style={{ color: 'var(--tr-accent)' }}>ROBOTICS</span></span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>GRAND HYATT — NYC</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontFamily: 'DM Mono, monospace', background: 'rgba(99,255,180,0.08)', color: 'var(--tr-accent)', border: '0.5px solid rgba(99,255,180,0.25)', borderRadius: 20, padding: '3px 10px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tr-accent)', display: 'inline-block' }} className="pulse" />
            SYSTEM ONLINE
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>{children}</main>
      </div>
    </div>
  )
}
