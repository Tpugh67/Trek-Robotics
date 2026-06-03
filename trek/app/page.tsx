'use client'
import Link from 'next/link'
import { Bot, Zap, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--tr-bg)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: '0.5px solid var(--tr-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--tr-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={18} color="#0a0c12" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '0.06em' }}>TREK <span style={{ color: 'var(--tr-accent)' }}>ROBOTICS</span></span>
        </div>
        <Link href="/dashboard" style={{ background: 'var(--tr-accent)', color: '#0a0c12', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
          Get Started
        </Link>
      </nav>

      <section style={{ textAlign: 'center', padding: '90px 48px 60px', maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px' }}>
          AI-Powered Hospitality<br /><span style={{ color: 'var(--tr-accent)' }}>Automation</span>
        </h1>
        <p style={{ fontSize: 18, color: 'var(--tr-muted)', lineHeight: 1.6, margin: '0 0 40px' }}>
          Trek Robotics brings AI concierge, robot fleet management, and smart dispatch to hotels, restaurants, and service businesses.
        </p>
        <Link href="/dashboard" style={{ background: 'var(--tr-accent)', color: '#0a0c12', padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          View Live Demo <ArrowRight size={16} />
        </Link>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, padding: '0 48px 80px', maxWidth: 1100, margin: '0 auto' }}>
        {[
          { icon: Bot, title: 'AI Concierge', desc: 'GPT-powered guest chat that understands intent and dispatches staff.' },
          { icon: Zap, title: 'Robot Fleet', desc: 'Dispatch and monitor delivery robots across your property.' },
          { icon: BarChart3, title: 'Analytics', desc: 'Track request volumes, response times, and guest satisfaction.' },
          { icon: Users, title: 'Staff Dispatch', desc: 'Smart routing sends the right team member automatically.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} style={{ background: 'var(--tr-surface)', border: '0.5px solid var(--tr-border)', borderRadius: 12, padding: '24px 20px' }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(99,255,180,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Icon size={18} color="var(--tr-accent)" />
            </div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 13, color: 'var(--tr-muted)', lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, padding: '0 48px 80px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { name: 'Starter', price: '$299', features: ['AI Concierge', 'Up to 2 robots', 'Basic analytics'] },
          { name: 'Pro', price: '$799', features: ['Everything in Starter', 'Unlimited robots', 'Advanced analytics', 'Staff dispatch'], highlight: true },
          { name: 'Enterprise', price: 'Custom', features: ['Multi-property', 'White-label', 'Custom integrations'] },
        ].map(plan => (
          <div key={plan.name} style={{ background: 'var(--tr-surface)', border: plan.highlight ? '2px solid var(--tr-accent)' : '0.5px solid var(--tr-border)', borderRadius: 12, padding: '24px 20px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{plan.name.toUpperCase()}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: plan.highlight ? 'var(--tr-accent)' : 'var(--tr-text)', marginBottom: 16 }}>{plan.price}</div>
            {plan.features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13 }}>
                <CheckCircle size={13} color="var(--tr-accent)" />
                <span style={{ color: 'var(--tr-muted)' }}>{f}</span>
              </div>
            ))}
            <Link href="/dashboard" style={{ display: 'block', textAlign: 'center', marginTop: 16, background: plan.highlight ? 'var(--tr-accent)' : 'transparent', color: plan.highlight ? '#0a0c12' : 'var(--tr-text)', border: plan.highlight ? 'none' : '0.5px solid var(--tr-border)', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
            </Link>
          </div>
        ))}
      </section>

      <footer style={{ borderTop: '0.5px solid var(--tr-border)', padding: '24px 48px', textAlign: 'center', fontSize: 12, color: 'var(--tr-muted)', fontFamily: 'DM Mono, monospace' }}>
        © 2024 TREK ROBOTICS · SOFTWARE-FIRST · INTEGRATION-SECOND · HARDWARE-THIRD
      </footer>
    </div>
  )
}
