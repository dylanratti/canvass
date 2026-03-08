'use client';
import { useEffect, useState, useCallback, useRef } from 'react';

const ADS = [
  { brand: 'Horizon Bank', headline: 'Your money\nworks harder\nhere.', url: 'horizonbank.com', bg: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)' },
  { brand: 'Volta Electric', headline: 'Drive past\nthe gas\nstation.', url: 'voltaelectric.com', bg: 'linear-gradient(135deg, #0d2818 0%, #1a4a2e 100%)' },
  { brand: 'Aura Wellness', headline: 'Sleep like\nyou mean\nit.', url: 'aurawellness.co', bg: 'linear-gradient(135deg, #2a1a0e 0%, #4a2e1a 100%)' },
];

const AGENTS_BY_AD = [
  [
    { initials: 'MC', name: 'Maya Chen', detail: '32 · Finance · NYC', color: '#C4622D', reaction: "This stops me. Clean message — I'd actually look up the brand.", score: 87, verdict: 'strong' as const },
    { initials: 'JO', name: 'James Okafor', detail: '41 · Operations · Chicago', color: '#6B7FA3', reaction: "Too abstract for a glance. I need a clearer reason to care.", score: 44, verdict: 'weak' as const },
    { initials: 'PS', name: 'Priya Sharma', detail: '28 · Product · SF', color: '#5A8A6A', reaction: "Simplicity earns attention. I'd remember this brand.", score: 91, verdict: 'strong' as const },
    { initials: 'RB', name: 'Rachel Brooks', detail: '38 · Marketing · Austin', color: '#9B7A5A', reaction: "Feels like it was made for someone else. Doesn't land.", score: 38, verdict: 'weak' as const },
  ],
  [
    { initials: 'DK', name: 'Devon Kim', detail: '29 · Tech · LA', color: '#5A8A6A', reaction: "This hits. I feel called out in the best way. Memorable.", score: 94, verdict: 'strong' as const },
    { initials: 'MC', name: 'Maya Chen', detail: '32 · Finance · NYC', color: '#C4622D', reaction: "Clever. I don't drive but this would make me think twice.", score: 71, verdict: 'strong' as const },
    { initials: 'TW', name: 'Tom Walsh', detail: '52 · Manufacturing · Detroit', color: '#6B7FA3', reaction: "Not for me. I'm not switching anytime soon.", score: 28, verdict: 'weak' as const },
    { initials: 'AM', name: 'Amara Mbeki', detail: '35 · Consulting · DC', color: '#8B6BAE', reaction: "Bold and clear. The copy does the work without overexplaining.", score: 88, verdict: 'strong' as const },
  ],
  [
    { initials: 'SW', name: 'Sarah Walsh', detail: '45 · Healthcare · Boston', color: '#5A8A6A', reaction: "Speaks to something real. I'd stop and read this twice.", score: 89, verdict: 'strong' as const },
    { initials: 'PS', name: 'Priya Sharma', detail: '28 · Product · SF', color: '#9B7A5A', reaction: "A bit vague. Could be any wellness brand. Needs more edge.", score: 52, verdict: 'neutral' as const },
    { initials: 'JO', name: 'James Okafor', detail: '41 · Operations · Chicago', color: '#6B7FA3', reaction: "Not my category but the creative is polished. I'd notice it.", score: 61, verdict: 'neutral' as const },
    { initials: 'RB', name: 'Rachel Brooks', detail: '38 · Marketing · Austin', color: '#C4622D', reaction: "This is exactly my category. The tone is right.", score: 92, verdict: 'strong' as const },
  ],
];

type Verdict = 'strong' | 'neutral' | 'weak';
const vs = (v: Verdict) => ({ strong: { color: '#2D7A4F', label: 'High resonance' }, neutral: { color: '#9A6B1A', label: 'Moderate' }, weak: { color: '#8B3A3A', label: 'Low resonance' } }[v]);

function useTypewriter(text: string, active: boolean) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!active) { setOut(''); return; }
    setOut(''); let i = 0;
    const iv = setInterval(() => { i++; setOut(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 20);
    return () => clearInterval(iv);
  }, [text, active]);
  return out;
}

function AgentRow({ agent, active, delay }: { agent: typeof AGENTS_BY_AD[0][0]; active: boolean; delay: number }) {
  const [vis, setVis] = useState(false);
  const [bar, setBar] = useState(0);
  const [typing, setTyping] = useState(false);
  const text = useTypewriter(agent.reaction, typing);
  const style = vs(agent.verdict);

  useEffect(() => {
    if (!active) { setVis(false); setBar(0); setTyping(false); return; }
    const t1 = setTimeout(() => setVis(true), delay);
    const t2 = setTimeout(() => setTyping(true), delay + 100);
    const t3 = setTimeout(() => setBar(agent.score), delay + 250);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active, delay, agent.score]);

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: '12px', alignItems: 'start',
      padding: '14px 0',
      borderBottom: '1px solid var(--border)',
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(6px)',
      transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {/* Avatar */}
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: agent.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.02em', flexShrink: 0 }}>
        {agent.initials}
      </div>

      {/* Content */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '5px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--ink)', fontFamily: 'var(--font-body)' }}>{agent.name}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--ink-3)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>{agent.detail}</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55, fontFamily: 'var(--font-body)', fontWeight: 300, margin: 0, minHeight: '1.3em' }}>
          {vis ? `"${text}${typing && text.length < agent.reaction.length ? '▋' : ''}"` : ''}
        </p>
        {/* Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
          <div style={{ flex: 1, height: '2px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${bar}%`, background: style.color, borderRadius: '99px', transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1)' }} />
          </div>
          <span style={{ fontSize: '0.64rem', color: style.color, fontFamily: 'var(--font-body)', fontWeight: 500, whiteSpace: 'nowrap' }}>{style.label}</span>
        </div>
      </div>

      {/* Score */}
      <div style={{ textAlign: 'right', paddingTop: '2px' }}>
        <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', color: style.color, lineHeight: 1 }}>{vis ? agent.score : '—'}</span>
        <div style={{ fontSize: '0.58rem', color: 'var(--ink-4)', fontFamily: 'var(--font-body)' }}>/100</div>
      </div>
    </div>
  );
}

type Phase = 'uploading' | 'analyzing' | 'running' | 'done' | 'resetting';

export default function AdSimulation() {
  const [adIdx, setAdIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('uploading');
  const [uploadP, setUploadP] = useState(0);
  const [analyzeP, setAnalyzeP] = useState(0);
  const [agentsActive, setAgentsActive] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [scoreVisible, setScoreVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const ad = ADS[adIdx];
  const agents = AGENTS_BY_AD[adIdx];
  const avg = Math.round(agents.reduce((s, a) => s + a.score, 0) / agents.length);
  const isGood = avg >= 65;

  const T = (fn: () => void, ms: number) => { const t = setTimeout(fn, ms); timers.current.push(t); return t; };
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = useCallback(() => {
    clearAll();
    setPhase('uploading'); setUploadP(0); setAnalyzeP(0);
    setAgentsActive(false); setOverallScore(0); setScoreVisible(false);

    let u = 0;
    const uIv = setInterval(() => { u += 5 + Math.random() * 8; setUploadP(p => Math.min(100, Math.round(u))); if (u >= 100) clearInterval(uIv); }, 55);
    T(() => setPhase('analyzing'), 1400);
    T(() => {
      let a = 0;
      const aIv = setInterval(() => { a += 3 + Math.random() * 5; setAnalyzeP(Math.min(100, Math.round(a))); if (a >= 100) clearInterval(aIv); }, 45);
    }, 1500);
    T(() => { setPhase('running'); setAgentsActive(true); }, 3000);
    const done = 3000 + agents.length * 580 + 900;
    T(() => {
      setScoreVisible(true);
      let n = 0;
      const iv = setInterval(() => { n++; setOverallScore(Math.min(n, avg)); if (n >= avg) clearInterval(iv); }, 20);
    }, done);
    T(() => setPhase('done'), done + 300);
    T(() => { setPhase('resetting'); setAgentsActive(false); T(() => setAdIdx(i => (i + 1) % ADS.length), 500); }, done + 5200);
  }, [adIdx, avg, agents.length]); // eslint-disable-line

  useEffect(() => { const t = setTimeout(run, 300); return () => clearTimeout(t); }, [adIdx]); // eslint-disable-line
  useEffect(() => () => clearAll(), []); // eslint-disable-line

  const fading = phase === 'resetting';
  const steps = ['Upload creative', 'Analyse', 'View results'];
  const stepIdx = phase === 'uploading' ? 0 : phase === 'analyzing' ? 1 : 2;

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(26,25,22,0.08)', width: '100%', opacity: fading ? 0 : 1, transition: 'opacity 0.4s ease' }}>

      {/* ── CHROME BAR ── */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => <div key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
        </div>
        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', background: i === stepIdx ? 'var(--terra)' : 'transparent', transition: 'background 0.3s' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: i < stepIdx ? 'var(--ink)' : i === stepIdx ? 'rgba(255,255,255,0.3)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
                  {i < stepIdx
                    ? <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5l1.8 1.8 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: i === stepIdx ? '#fff' : 'var(--ink-4)' }} />}
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: 500, fontFamily: 'var(--font-body)', color: i === stepIdx ? '#fff' : i < stepIdx ? 'var(--ink)' : 'var(--ink-4)', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: '16px', height: '1px', background: i < stepIdx ? 'var(--ink-4)' : 'var(--border)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
        <span style={{ fontSize: '0.64rem', color: 'var(--ink-3)', fontFamily: 'var(--font-body)', fontWeight: 300, flexShrink: 0 }}>canvass demo</span>
      </div>

      {/* ── AD PREVIEW ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>

        {/* Billboard street scene */}
        <div style={{ borderRight: '1px solid var(--border)', position: 'relative', overflow: 'hidden', background: '#D6E4F0' }}>
          {/* Sky */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #B8D4E8 0%, #D6E4F0 55%, #C8D8C0 55%, #A8BC98 100%)' }} />
          {/* Distant buildings */}
          <div style={{ position: 'absolute', bottom: '32%', left: 0, right: 0, display: 'flex', alignItems: 'flex-end', gap: '2px', padding: '0 10px', opacity: 0.35 }}>
            {[18,28,22,35,16,30,25,20,32,18,24,15,28].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}px`, background: '#7A8E9A', borderRadius: '1px 1px 0 0' }} />
            ))}
          </div>
          {/* Ground / road */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32%', background: 'linear-gradient(180deg, #A8BC98 0%, #8A9E80 100%)' }} />
          {/* Road stripe */}
          <div style={{ position: 'absolute', bottom: '8%', left: '15%', right: '15%', height: '2px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />

          {/* Billboard structure */}
          <div style={{ position: 'relative', zIndex: 3, padding: '14px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Frame + face */}
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Outer frame / catwalk */}
              <div style={{ background: '#4A4A4A', borderRadius: '3px 3px 0 0', padding: '3px', boxShadow: '0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                {/* Ad face */}
                <div style={{ background: ad.bg, borderRadius: '2px', padding: 'clamp(12px,2vw,18px) clamp(14px,2.5vw,22px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', minHeight: '110px' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 75% 20%, rgba(255,255,255,0.07) 0%, transparent 55%)', pointerEvents: 'none' }} />

                  {/* Upload overlay */}
                  {phase === 'uploading' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Uploading creative</div>
                      <div style={{ width: '100px', height: '2px', background: 'rgba(255,255,255,0.15)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${uploadP}%`, background: '#fff', borderRadius: '99px', transition: 'width 0.08s linear' }} />
                      </div>
                      <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{uploadP}%</div>
                    </div>
                  )}
                  {/* Scan line */}
                  {phase === 'analyzing' && (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, right: 0, top: `${analyzeP}%`, height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(196,98,45,0.95), transparent)', transition: 'top 0.05s linear', boxShadow: '0 0 10px rgba(196,98,45,0.6)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
                    </div>
                  )}

                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: '0.42rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>{ad.brand}</div>
                    <div style={{ fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', fontFamily: 'var(--font-display)', color: '#fff', lineHeight: 1.2 }}>{ad.headline}</div>
                  </div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: '0.06em' }}>{ad.url}</div>
                  </div>
                </div>
              </div>
              {/* Bottom frame bar with catwalk */}
              <div style={{ height: '6px', background: '#3A3A3A', borderRadius: '0 0 2px 2px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
            </div>

            {/* Support posts */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '55%', position: 'relative' }}>
              <div style={{ width: '7px', height: '28px', background: 'linear-gradient(90deg, #5A5A5A, #3A3A3A)', borderRadius: '0 0 2px 2px' }} />
              <div style={{ width: '7px', height: '28px', background: 'linear-gradient(90deg, #5A5A5A, #3A3A3A)', borderRadius: '0 0 2px 2px' }} />
            </div>
            {/* Base */}
            <div style={{ width: '65%', height: '4px', background: '#2A2A2A', borderRadius: '2px', marginBottom: '0', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }} />
          </div>
        </div>

        {/* Score panel */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: scoreVisible ? (isGood ? 'rgba(45,122,79,0.04)' : 'rgba(139,58,58,0.04)') : 'var(--cream)', transition: 'background 0.6s' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
            Overall score
          </div>
          {scoreVisible ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.6rem)', color: 'var(--ink)', lineHeight: 1 }}>{overallScore}</span>
                <span style={{ fontSize: '1.1rem', color: 'var(--ink-4)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>/100</span>
              </div>
              <div style={{ height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden', marginBottom: '10px', maxWidth: '160px' }}>
                <div style={{ height: '100%', width: `${overallScore}%`, background: isGood ? '#2D7A4F' : '#8B3A3A', borderRadius: '99px', transition: 'width 1.8s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '99px', background: isGood ? 'rgba(45,122,79,0.1)' : 'rgba(139,58,58,0.1)', width: 'fit-content' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isGood ? '#2D7A4F' : '#8B3A3A' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 500, color: isGood ? '#2D7A4F' : '#8B3A3A', fontFamily: 'var(--font-body)' }}>{isGood ? 'Ready to post' : 'Revise creative'}</span>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: '80px', height: '3.5rem', background: 'var(--border)', borderRadius: '8px', marginBottom: '12px', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
              <div style={{ width: '110px', height: '2px', background: 'var(--border)', borderRadius: '99px', marginBottom: '10px' }} />
              <div style={{ width: '100px', height: '20px', background: 'var(--border)', borderRadius: '99px', animation: `skeleton-pulse 1.5s 0.3s ease-in-out infinite` }} />
            </>
          )}
        </div>
      </div>

      {/* ── AGENT REACTIONS ── */}
      <div style={{ padding: '0 24px 8px' }}>
        <div style={{ padding: '14px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', fontFamily: 'var(--font-body)' }}>Audience reactions</span>
          <span style={{ fontSize: '0.62rem', color: 'var(--ink-3)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>{agents.length} agents tested</span>
        </div>

        {(phase === 'running' || phase === 'done')
          ? agents.map((a, i) => <AgentRow key={`${adIdx}-${i}`} agent={a} active={agentsActive} delay={i * 550} />)
          : (
            <div style={{ paddingBottom: '8px' }}>
              {agents.map((_, i) => (
                <div key={i} style={{ height: '68px', borderRadius: '8px', background: 'var(--cream)', border: '1px solid var(--border)', marginBottom: '8px', opacity: 0.5 + i * 0.06, animation: phase === 'analyzing' ? `skeleton-pulse 1.6s ${i * 0.15}s ease-in-out infinite` : 'none' }} />
              ))}
              <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--ink-3)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                  {phase === 'uploading' ? 'Waiting for upload to complete...' : 'Agents are analysing your creative...'}
                </span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
