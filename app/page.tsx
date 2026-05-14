'use client'
import Link from 'next/link'
import { Bot, Zap, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  { icon: Bot, title: 'AI Concierge', desc: 'GPT-powered guest chat that understands intent, creates tickets, and notifies staff instantly.' },
  { icon: Zap, title: 'Robot Fleet Management', desc: 'Dispatch and monitor delivery robots across your property in real time.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track request volumes, response times, and guest satisfaction scores.' },
  { icon: Users, title: 'Staff Dispatch', desc: 'Smart routing sends the right team member to the right room automatically.' },
]

const verticals = ['Boutique Hotels', 'Restaurants', 'Casinos', 'Senior Living', 'Airports']

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--tr-bg)', fontFamily: 'Syne, sans-serif' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: '0.5px solid var(--tr-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--tr-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={18} color="#0a0c12" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '0.06em' }}>
            TREK <span style={{ color: 'var(--tr-accent)' }}>ROBOTICS</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/dashboard" style={{ fontSize: 13, color: 'var(--tr-muted)', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/dashboard" style={{
            background: 'var(--tr-accent)', color: '#0a0c12', padding: '8px 18px',
            borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em'
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '90px 48px 60px', maxWidth: 760, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11,
          fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em',
          background: 'rgba(99,255,180,0.08)', color: 'var(--tr-accent)',
          border: '0.5px solid rgba(99,255,180,0.25)', borderRadius: 20, padding: '5px 14px', marginBottom: 32
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tr-accent)', display: 'inline-block' }} className="pulse" />
          NOW IN BETA — JOIN THE WAITLIST
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px', color: 'var(--tr-text)' }}>
          AI-Powered Hospitality<br />
          <span style={{ color: 'var(--tr-accent)' }}>Automation</span>
        </h1>
        <p style={{ fontSize: 18, color: 'var(--tr-muted)', lineHeight: 1.6, margin: '0 0 40px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          Trek Robotics brings AI concierge, robot fleet management, and smart dispatch to hotels, restaurants, and service businesses.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard" style={{
            background: 'var(--tr-accent)', color: '#0a0c12', padding: '14px 28px',
            borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.04em'
          }}>
            View Live Demo <ArrowRight size={16} />
          </Link>
          <button style={{
            background: 'transparent', color: 'var(--tr-text)', padding: '14px 28px',
            borderRadius: 10, fontSize: 14, fontWeight: 500, border: '0.5px solid var(--tr-border)',
            cursor: 'pointer', letterSpacing: '0.04em'
          }}>
            Watch Demo Video
          </button>
        </div>
      </section>

      {/* Verticals */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: '0 48px 60px', flexWrap: 'wrap' }}>
        {verticals.map(v => (
          <span key={v} style={{
            fontSize: 12, fontFamily: 'DM Mono, monospace',
            background: 'rgba(255,255,255,0.04)', color: 'var(--tr-muted)',
            border: '0.5px solid var(--tr-border)', borderRadius: 20, padding: '5px 14px'
          }}>{v}</span>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: '0 48px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', color: 'var(--tr-muted)', marginBottom: 28, textAlign: 'center' }}>PLATFORM FEATURES</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)',
              borderRadius: 12, padding: '24px 20px'
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 9,
                background: 'rgba(99,255,180,0.1)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: 16
              }}>
                <Icon size={18} color="var(--tr-accent)" />
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--tr-muted)', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '0 48px 80px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', color: 'var(--tr-muted)', marginBottom: 28, textAlign: 'center' }}>PRICING</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { name: 'Starter', price: '$299', period: '/mo', features: ['AI Concierge', 'Up to 2 robots', 'Basic analytics', 'Email support'], highlight: false },
            { name: 'Pro', price: '$799', period: '/mo', features: ['Everything in Starter', 'Unlimited robots', 'Advanced analytics', 'Staff dispatch', 'Priority support'], highlight: true },
            { name: 'Enterprise', price: 'Custom', period: '', features: ['Multi-property', 'White-label', 'Custom integrations', 'Dedicated CSM'], highlight: false },
          ].map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'rgba(99,255,180,0.04)' : 'var(--tr-surface)',
              border: plan.highlight ? '2px solid var(--tr-accent)' : '0.5px solid var(--tr-border)',
              borderRadius: 12, padding: '24px 20px', position: 'relative'
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--tr-accent)', color: '#0a0c12',
                  fontSize: 10, fontWeight: 700, fontFamily: 'DM Mono, monospace',
                  padding: '3px 12px', borderRadius: 20, letterSpacing: '0.08em'
                }}>MOST POPULAR</div>
              )}
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, letterSpacing: '0.05em' }}>{plan.name.toUpperCase()}</div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: plan.highlight ? 'var(--tr-accent)' : 'var(--tr-text)' }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: 'var(--tr-muted)' }}>{plan.period}</span>
              </div>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 13 }}>
                  <CheckCircle size={13} color="var(--tr-accent)" />
                  <span style={{ color: 'var(--tr-muted)' }}>{f}</span>
                </div>
              ))}
              <Link href="/dashboard" style={{
                display: 'block', textAlign: 'center', marginTop: 20,
                background: plan.highlight ? 'var(--tr-accent)' : 'transparent',
                color: plan.highlight ? '#0a0c12' : 'var(--tr-text)',
                border: plan.highlight ? 'none' : '0.5px solid var(--tr-border)',
                padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.04em'
              }}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '0.5px solid var(--tr-border)', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: 'var(--tr-muted)' }}>© 2024 TREK ROBOTICS</span>
        <span style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: 'var(--tr-muted)' }}>SOFTWARE-FIRST · INTEGRATION-SECOND · HARDWARE-THIRD</span>
      </footer>
    </div>
  )
}
