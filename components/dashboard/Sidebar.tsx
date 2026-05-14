'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ListChecks, Bot, MessageSquareText,
  Users, Wrench, BarChart3, Settings,
} from 'lucide-react'

const nav = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, section: 'Operations' },
  { label: 'Requests', href: '/dashboard/requests', icon: ListChecks, section: 'Operations', badge: 4 },
  { label: 'Fleet', href: '/dashboard/fleet', icon: Bot, section: 'Operations' },
  { label: 'Concierge', href: '/dashboard/concierge', icon: MessageSquareText, section: 'Operations' },
  { label: 'Staff', href: '/dashboard/staff', icon: Users, section: 'Management' },
  { label: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench, section: 'Management', badge: 2 },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, section: 'Management' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, section: 'System' },
]

export default function Sidebar() {
  const pathname = usePathname()

  const sections = [...new Set(nav.map(n => n.section))]

  return (
    <aside style={{
      width: 180, background: 'var(--tr-bg)',
      borderRight: '0.5px solid var(--tr-border)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      padding: '12px 0',
    }}>
      {sections.map(section => (
        <div key={section}>
          <div style={{
            fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.2)',
            padding: '10px 16px 4px', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase',
          }}>{section}</div>
          {nav.filter(n => n.section === section).map(({ label, href, icon: Icon, badge }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 16px', fontSize: 13, textDecoration: 'none',
                color: active ? 'var(--tr-accent)' : 'rgba(255,255,255,0.45)',
                background: active ? 'rgba(99,255,180,0.07)' : 'transparent',
                borderLeft: active ? '2px solid var(--tr-accent)' : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                <Icon size={15} />
                <span style={{ flex: 1 }}>{label}</span>
                {badge && (
                  <span style={{
                    fontSize: 10, fontFamily: 'DM Mono, monospace',
                    background: 'rgba(255,90,90,0.18)', color: 'var(--tr-danger)',
                    borderRadius: 10, padding: '1px 6px',
                  }}>{badge}</span>
                )}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
