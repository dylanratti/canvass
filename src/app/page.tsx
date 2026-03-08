import WaitlistForm from '@/components/WaitlistForm';
import SR from '@/components/ScrollReveal';
import AdSimulation from '@/components/AdSimulation';

const TICKER = ['Maya · 32 · Finance · NYC','James · 41 · Operations · Chicago','Priya · 28 · Product · SF','Carlos · 37 · Retail · Miami','Sarah · 45 · Healthcare · Boston','Devon · 30 · Creative · LA','Wei · 34 · Banking · NYC','Amara · 27 · Strategy · DC','Tom · 52 · Manufacturing · Detroit','Marcus · 29 · Ventures · Austin'];
const AGENTS = [
  { initials: 'MC', name: 'Maya Chen', age: 32, role: 'Senior Associate', location: 'Financial District, NYC', income: '$185K', tags: ['Daily commuter', 'Brand-conscious', 'Bloomberg reader'], note: 'Best for: Midtown digital displays, PATH transit' },
  { initials: 'JO', name: 'James Okafor', age: 41, role: 'VP Operations', location: 'River North, Chicago', income: '$210K', tags: ['Car commuter', 'Premium buyer', 'Sports fan'], note: 'Best for: Expressway billboards, stadium OOH' },
  { initials: 'PS', name: 'Priya Sharma', age: 28, role: 'Product Manager', location: 'SoMa, SF', income: '$155K', tags: ['Transit rider', 'App-first', 'Sustainability-aware'], note: 'Best for: BART stations, Mission District' },
  { initials: 'CR', name: 'Carlos Rivera', age: 37, role: 'District Manager', location: 'Brickell, Miami', income: '$130K', tags: ['Bilingual', 'Loyalty-driven', 'Driver'], note: 'Best for: I-95 corridor, retail strips' },
];

const w = (n: number): React.CSSProperties => ({ fontFamily: 'var(--font-body)', fontWeight: n });
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' };

export default function Home() {
  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250,250,247,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' }}>
        <div className="nav-inner" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...display, fontSize: '1.25rem', letterSpacing: '0.06em', color: 'var(--ink)' }}>CANVASS</span>
          <a href="#waitlist" className="btn-outline">Join waitlist</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="section-pad" style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 48px 60px' }}>
        <div className="hero-mb" style={{ maxWidth: '680px', marginBottom: '72px' }}>
          <h1 className="hero-headline" style={{ ...display, fontSize: 'clamp(2.4rem, 6vw, 5.2rem)', lineHeight: 1.05, letterSpacing: '0.01em', color: 'var(--ink)', marginBottom: '24px' }}>
            Know if your ad lands<br />
            <span style={{ color: 'var(--terra)' }}>before you pay for it.</span>
          </h1>
          <p className="hero-sub" style={{ ...w(300), fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: '500px', marginBottom: '36px' }}>
            Test your billboard creative against AI agents trained to respond like your actual audience — before you sign a 3-month contract you can't get out of.
          </p>
          <WaitlistForm variant="hero" />
          <p style={{ ...w(300), fontSize: '0.78rem', color: 'var(--ink-3)', marginTop: '12px' }}>Free to join · First 100 brands receive founding pricing</p>
        </div>

        <AdSimulation />

        {/* Stats */}
        <div className="stats-grid" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border)' }}>
          {[
            { val: '92%', label: 'Correlation with real panel studies' },
            { val: '48h', label: 'Average report turnaround' },
            { val: '400+', label: 'Demographic agent profiles' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 0', paddingRight: i < 2 ? '24px' : '0', paddingLeft: i > 0 ? '32px' : '0', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ ...display, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--ink)', lineHeight: 1, marginBottom: '6px' }}>{s.val}</div>
              <div style={{ ...w(300), fontSize: '0.82rem', color: 'var(--ink-3)', lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 0', background: 'var(--white)' }}>
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ ...w(300), padding: '0 28px', fontSize: '0.8rem', color: 'var(--ink-3)', whiteSpace: 'nowrap', borderRight: '1px solid var(--border)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section-pad section-pad-v" style={{ maxWidth: '1120px', margin: '0 auto', padding: '100px 48px' }}>
        <SR>
          <p style={{ ...w(400), fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '20px' }}>How it works</p>
          <h2 style={{ ...display, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.1, letterSpacing: '0.01em', color: 'var(--ink)', marginBottom: '48px', maxWidth: '440px' }}>
            Pre-flight your creative.<br />Results in 48 hours.
          </h2>
        </SR>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {[
            { n: '01', title: 'Upload your creative', body: 'Drop in your billboard design or copy variants. Any format — static, animated, or video.' },
            { n: '02', title: 'Select your agents', body: 'Pick demographic profiles matched to your placement geography — filtered by age, income, profession, and behavior.' },
            { n: '03', title: 'Read your report', body: 'Attention scores, message comprehension, purchase intent, and behavioral reasoning per cohort — within 48 hours.' },
          ].map((step, i) => (
            <SR key={i} delay={i * 100}>
              <div style={{ background: 'var(--cream)', padding: '44px 40px', height: '100%' }}>
                <div style={{ ...display, fontSize: '2.8rem', color: 'var(--border)', lineHeight: 1, marginBottom: '28px', letterSpacing: '0.04em' }}>{step.n}</div>
                <h3 style={{ ...w(500), fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.4 }}>{step.title}</h3>
                <p style={{ ...w(300), fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.75 }}>{step.body}</p>
              </div>
            </SR>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="section-pad section-pad-v" style={{ background: 'var(--ink)', padding: '100px 48px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <SR>
            <p style={{ ...w(400), fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,250,247,0.35)', marginBottom: '20px' }}>The status quo</p>
            <h2 style={{ ...display, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, color: 'var(--cream)', marginBottom: '18px' }}>
              Every channel lets you test<br />before you scale. Except one.
            </h2>
            <p style={{ ...w(300), fontSize: '1rem', color: 'rgba(250,250,247,0.45)', lineHeight: 1.8, maxWidth: '480px', marginBottom: '48px' }}>
              Paid social, search, CTV — all testable before you commit. OOH locks you into a 3-month contract with zero signal. You find out if it worked after the money is gone.
            </p>
          </SR>
          <div className="problem-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {[
              { val: '#1', label: 'OOH has the highest ad recall of any media channel', sub: 'Higher than TV, streaming, social, radio, and print — per a 2023 Solomon Partners analysis of 5 years of data.', src: 'Solomon Partners / OAAA, 2023' },
              { val: '$6', label: 'In product sales generated per $1 spent on OOH', sub: "The medium with the best ROI that you can't A/B test before committing. Until now.", src: 'Vistar Media, 2024' },
              { val: '46%', label: 'Of consumers search for a brand after seeing an OOH ad', sub: "It drives digital action at scale — but only if the creative actually lands with the people who see it.", src: 'One Day Agency / OAAA' },
            ].map((item, i) => (
              <SR key={i} delay={i * 80}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ ...display, fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', color: 'var(--terra)', lineHeight: 1, marginBottom: '12px' }}>{item.val}</div>
                  <div style={{ ...w(500), fontSize: '0.88rem', color: 'var(--cream)', marginBottom: '10px', lineHeight: 1.4 }}>{item.label}</div>
                  <div style={{ ...w(300), fontSize: '0.82rem', color: 'rgba(250,250,247,0.35)', lineHeight: 1.7, flex: 1 }}>{item.sub}</div>
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ ...w(300), fontSize: '0.64rem', color: 'rgba(250,250,247,0.2)' }}>{item.src}</span>
                  </div>
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* VALIDATION */}
      <section className="section-pad section-pad-v" style={{ maxWidth: '1120px', margin: '0 auto', padding: '100px 48px' }}>
        <div className="validation-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'start' }}>
          <SR>
            <p style={{ ...w(400), fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '20px' }}>Why trust it</p>
            <h2 style={{ ...display, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '22px' }}>
              Every agent is calibrated against real panels.
            </h2>
            <p style={{ ...w(300), fontSize: '0.92rem', color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: '16px' }}>We purchase validated market research panel studies for the same demographics we've built agents around — then run identical creative through both.</p>
            <p style={{ ...w(300), fontSize: '0.92rem', color: 'var(--ink-2)', lineHeight: 1.85 }}>The alignment between agent prediction and real panel response is our entire credibility claim. We publish the methodology. Stress-test it before you trust it with a real budget.</p>
          </SR>
          <SR delay={150}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ ...w(500), fontSize: '0.8rem', color: 'var(--ink)' }}>Benchmark validation</span>
                <span style={{ ...w(300), fontSize: '0.74rem', color: 'var(--ink-3)' }}>NYC Finance · Q4 2024</span>
              </div>
              <div style={{ padding: '24px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '28px' }}>
                  <span style={{ ...display, fontSize: '3.2rem', color: 'var(--ink)', lineHeight: 1 }}>92%</span>
                  <span style={{ ...w(300), fontSize: '0.82rem', color: 'var(--ink-3)' }}>response correlation</span>
                </div>
                {[
                  { label: 'Purchase intent', agent: 74, panel: 71 },
                  { label: 'Message comprehension', agent: 88, panel: 85 },
                  { label: 'Brand recall', agent: 63, panel: 67 },
                  { label: 'Attention likelihood', agent: 81, panel: 79 },
                ].map((row, i) => (
                  <div key={i} style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
                      <span style={{ ...w(400), fontSize: '0.8rem', color: 'var(--ink-2)' }}>{row.label}</span>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <span style={{ ...w(500), fontSize: '0.75rem', color: 'var(--ink)' }}>Agent {row.agent}%</span>
                        <span style={{ ...w(300), fontSize: '0.75rem', color: 'var(--ink-3)' }}>Panel {row.panel}%</span>
                      </div>
                    </div>
                    <div style={{ height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ position: 'absolute', height: '100%', width: `${row.panel}%`, background: 'var(--terra)', opacity: 0.25, borderRadius: '99px' }} />
                      <div style={{ position: 'absolute', height: '100%', width: `${row.agent}%`, background: 'var(--terra)', opacity: 0.8, borderRadius: '99px' }} />
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                  <span style={{ ...w(300), fontSize: '0.7rem', color: 'var(--ink-4)' }}>Panel n=340 · Kantar syndicated study · Oct 2024</span>
                </div>
              </div>
            </div>
          </SR>
        </div>
      </section>

      {/* AGENTS */}
      <section className="section-pad section-pad-v" style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '100px 48px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <SR>
            <p style={{ ...w(400), fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '20px' }}>Agent library</p>
            <h2 style={{ ...display, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '14px', maxWidth: '420px' }}>
              Not averages.<br />Individuals.
            </h2>
            <p style={{ ...w(300), fontSize: '0.92rem', color: 'var(--ink-2)', marginBottom: '48px', maxWidth: '440px', lineHeight: 1.75 }}>Each agent layers demographic, behavioral, and psychographic data. They respond the way real people in that segment actually would.</p>
          </SR>
          <div className="agents-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
            {AGENTS.map((a, i) => (
              <SR key={i} delay={i * 80}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--terra-bg)', border: '1px solid rgba(196,98,45,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...display, fontSize: '0.72rem', color: 'var(--terra)', flexShrink: 0 }}>
                      {a.initials}
                    </div>
                    <div>
                      <div style={{ ...w(500), fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.3 }}>{a.name}</div>
                      <div style={{ ...w(300), fontSize: '0.72rem', color: 'var(--ink-3)' }}>{a.age} · {a.role}</div>
                    </div>
                  </div>
                  <div style={{ ...w(300), fontSize: '0.78rem', color: 'var(--ink-2)', marginBottom: '2px' }}>{a.location}</div>
                  <div style={{ ...w(300), fontSize: '0.78rem', color: 'var(--ink-2)', marginBottom: '14px' }}>{a.income} HHI</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                    {a.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ ...w(300), fontSize: '0.74rem', color: 'var(--ink-3)' }}>{a.note}</span>
                  </div>
                </div>
              </SR>
            ))}
          </div>
          <SR delay={200}><p style={{ ...w(300), textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-3)', marginTop: '24px' }}>+ 400 more profiles across 38 US metros and 12 international markets</p></SR>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" className="cta-pad" style={{ padding: '120px 48px', background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <SR>
          <div style={{ maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="cta-heading" style={{ ...display, fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '18px' }}>
              Stop guessing.<br />
              <span style={{ color: 'var(--terra)' }}>Start knowing.</span>
            </h2>
            <p style={{ ...w(300), fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: '36px' }}>First 100 brands get founding pricing, direct team access, and input into which demographic agents we build first.</p>
            <WaitlistForm variant="cta" />
            <p style={{ ...w(300), fontSize: '0.78rem', color: 'var(--ink-3)', marginTop: '14px' }}>No spam. No sales calls unless you want one.</p>
          </div>
        </SR>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="footer-inner" style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ ...display, fontSize: '1.1rem', letterSpacing: '0.06em', color: 'var(--ink)' }}>CANVASS</span>
            <span style={{ ...w(300), fontSize: '0.78rem', color: 'var(--ink-3)' }}>Know before you post.</span>
          </div>
          <span style={{ ...w(300), fontSize: '0.74rem', color: 'var(--ink-4)' }}>© 2025 Canvass. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
