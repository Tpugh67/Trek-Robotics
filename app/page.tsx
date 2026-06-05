'use client'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050810', fontFamily: 'system-ui, sans-serif', color: '#f0f4f0' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', borderBottom: '0.5px solid rgba(99,255,180,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: '#63ffb4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="4.5" r="2.5" fill="#050810"/><rect x="4.5" y="8" width="7" height="5.5" rx="1.5" fill="#050810"/><rect x="2.5" y="9.5" width="2" height="3.5" rx="1" fill="#050810"/><rect x="11.5" y="9.5" width="2" height="3.5" rx="1" fill="#050810"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '0.08em' }}>TREK <span style={{ color: '#63ffb4' }}>ROBOTICS</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <span style={{ fontSize: 13, color: 'rgba(240,244,240,0.55)', cursor: 'pointer' }}>Products</span>
          <span style={{ fontSize: 13, color: 'rgba(240,244,240,0.55)', cursor: 'pointer' }}>Fleet</span>
          <span style={{ fontSize: 13, color: 'rgba(240,244,240,0.55)', cursor: 'pointer' }}>Enterprise</span>
          <Link href="/dashboard" style={{ background: '#63ffb4', color: '#050810', padding: '9px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em' }}>Order Now</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 48px 60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em', background: 'rgba(99,255,180,0.08)', color: '#63ffb4', border: '0.5px solid rgba(99,255,180,0.25)', borderRadius: 20, padding: '5px 14px', marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#63ffb4', display: 'inline-block' }} />
          NOW DEPLOYING · HOSPITALITY ROBOTICS
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
          The robots that<br />run your <span style={{ color: '#63ffb4' }}>hotel</span>
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(240,244,240,0.55)', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Autonomous concierge, delivery, and security robots built for hotels, restaurants, casinos, and senior living.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/dashboard" style={{ background: '#63ffb4', color: '#050810', padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Shop the Fleet <ArrowRight size={16} />
          </Link>
          <button style={{ background: 'transparent', color: '#f0f4f0', padding: '14px 28px', borderRadius: 10, fontSize: 14, border: '0.5px solid rgba(240,244,240,0.2)', cursor: 'pointer' }}>
            Watch Demo
          </button>
        </div>
      </section>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '0.5px solid rgba(99,255,180,0.1)', borderBottom: '0.5px solid rgba(99,255,180,0.1)', marginBottom: 60 }}>
        {[['500+','ROBOTS DEPLOYED'],['98%','UPTIME GUARANTEED'],['4.2m','AVG RESPONSE TIME'],['60+','HOTEL PARTNERS']].map(([num, label]) => (
          <div key={label} style={{ padding: '32px 40px', textAlign: 'center', borderRight: '0.5px solid rgba(99,255,180,0.1)' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#63ffb4', lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: 11, color: 'rgba(240,244,240,0.4)', marginTop: 6, fontFamily: 'monospace', letterSpacing: '0.06em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <section style={{ padding: '0 48px 60px' }}>
        <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(240,244,240,0.35)', marginBottom: 24 }}>THE FLEET</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            { role: 'AI CONCIERGE ROBOT', name: 'Trek C-1', desc: 'Greets guests, answers questions, and navigates autonomously through your lobby 24/7.', price: '$24,900', best: false },
            { role: 'DELIVERY ROBOT', name: 'Trek D-2', desc: 'Delivers room service, amenities, and packages to any room. Navigates elevators autonomously.', price: '$18,500', best: true },
            { role: 'PATROL & SECURITY ROBOT', name: 'Trek S-3', desc: 'Autonomous security patrols, anomaly detection, and 360° HD surveillance for large properties.', price: '$31,200', best: false },
          ].map(p => (
            <div key={p.name} style={{ background: '#0d1117', border: `0.5px solid ${p.best ? 'rgba(99,255,180,0.4)' : 'rgba(99,255,180,0.12)'}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: 200, background: '#080c10', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {p.best && <div style={{ position: 'absolute', top: 12, right: 12, background: '#63ffb4', color: '#050810', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 10, fontFamily: 'monospace' }}>BESTSELLER</div>}
                <div style={{ fontSize: 64 }}>🤖</div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.08em', color: '#63ffb4', marginBottom: 4 }}>{p.role}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(240,244,240,0.5)', lineHeight: 1.5, marginBottom: 16 }}>{p.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{p.price} <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(240,244,240,0.4)' }}>/unit</span></div>
                  <button style={{ background: '#63ffb4', color: '#050810', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Configure</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 48px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(240,244,240,0.35)', marginBottom: 16 }}>WHY TREK</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            Built for <span style={{ color: '#63ffb4' }}>hospitality</span>,<br />not warehouses
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(240,244,240,0.5)', lineHeight: 1.7, marginBottom: 24 }}>
            Every Trek robot is designed from the ground up for guest-facing environments — quiet, safe, and elegant.
          </p>
          {['Autonomous elevator and door navigation', 'AI guest interaction in 12 languages', 'Fleet management dashboard included', '24/7 remote monitoring and support', 'White-label branding available'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 14, color: 'rgba(240,244,240,0.7)' }}>
              <CheckCircle size={16} color="#63ffb4" />
              {f}
            </div>
          ))}
        </div>
        <div style={{ background: '#0d1117', border: '0.5px solid rgba(99,255,180,0.12)', borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(240,244,240,0.35)', letterSpacing: '0.1em', marginBottom: 16 }}>TREK D-2 SPECS</div>
          {[['MAX PAYLOAD','15 kg',true],['BATTERY LIFE','12 hrs',true],['TOP SPEED','1.2 m/s',false],['NAVIGATION','LiDAR + SLAM',false],['ELEVATOR COMPATIBLE','Yes',true],['WARRANTY','3 years',false],['SETUP TIME','24 hrs',true]].map(([k,v,a]) => (
            <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid rgba(99,255,180,0.08)' }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(240,244,240,0.4)', letterSpacing: '0.06em' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: a ? '#63ffb4' : '#f0f4f0' }}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '0.5px solid rgba(99,255,180,0.1)', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: 'monospace', color: 'rgba(240,244,240,0.3)' }}>
        <span>© 2024 TREK ROBOTICS</span>
        <span>BUILT FOR HOSPITALITY · POWERED BY AI</span>
      </footer>
    </div>
  )
}
