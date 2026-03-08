'use client';
import { useState } from 'react';
export default function WaitlistForm({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [msg, setMsg] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, company }) });
      const data = await res.json();
      if (res.ok) { setStatus('success'); setMsg("You're on the list. We'll be in touch."); }
      else { setStatus('error'); setMsg(data.error || 'Something went wrong.'); }
    } catch { setStatus('error'); setMsg('Connection error. Try again.'); }
  };
  if (status === 'success') return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', background: 'rgba(45,122,79,0.06)', border: '1px solid rgba(45,122,79,0.2)', borderRadius: '8px' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#2D7A4F"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <span style={{ fontSize: '0.875rem', color: '#2D7A4F', fontFamily: 'var(--font-body)' }}>{msg}</span>
    </div>
  );
  return (
    <form onSubmit={submit}>
      <div className="waitlist-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {variant === 'cta' && <input className="field" type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} style={{ flex: '1', minWidth: '130px' }} />}
        <input className="field" type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required style={{ flex: '2', minWidth: '180px' }} />
        <button className="btn" type="submit" disabled={status === 'loading'} style={{ flexShrink: 0 }}>{status === 'loading' ? 'Joining...' : 'Get early access'}</button>
      </div>
      {status === 'error' && <p style={{ fontSize: '0.8rem', color: '#8B3A3A', marginTop: '8px' }}>{msg}</p>}
    </form>
  );
}
