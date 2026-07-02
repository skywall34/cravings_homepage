// landing.jsx — Cravings marketing landing page
// Hero (with iPhone showing auto-cycling swipe card), How it works, CTA, Footer.
// Tweaks: theme (light/dark), accent color, headline copy.

const ACCENT_OPTIONS = ['#E85D04', '#D14600', '#F48C06', '#C8102E'];

function hexWithAlpha(hex, alpha) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return hex + a;
}

function applyTheme(theme, accent) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.setProperty('--cravings-orange', accent);
  // Card + phone shadows stay neutral; only the CTA button carries accent tint.
  root.style.setProperty('--shadow-card',
    `0 8px 36px rgba(26,20,14,0.07), 0 2px 8px rgba(0,0,0,0.05)`);
  root.style.setProperty('--shadow-cta',
    `0 8px 22px ${hexWithAlpha(accent, 0.24)}, 0 2px 6px ${hexWithAlpha(accent, 0.14)}`);
  root.style.setProperty('--shadow-phone',
    `0 50px 100px -24px rgba(26,20,14,0.24), 0 24px 50px -24px rgba(0,0,0,0.16)`);
}

function Landing() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS__);

  React.useEffect(() => {
    applyTheme(tweaks.theme, tweaks.accent);
  }, [tweaks.theme, tweaks.accent]);

  return (
    <div data-screen-label="01 Landing">
      {/* Background blobs — faint, mostly neutral */}
      <div className="bg-blob" style={{
        width: 460, height: 460, top: -140, right: -120,
        background: tweaks.accent,
      }} />
      <div className="bg-blob" style={{
        width: 380, height: 380, top: 460, left: -140,
        background: '#C8BEB2',
        opacity: 0.10,
      }} />

      {/* ───── Top nav ───── */}
      <nav className="topnav">
        <div className="wordmark">
          <span className="mark"><Mark size={30} /></span>
          <span>Cravings</span>
        </div>
        <div className="topnav-links">
          <a href="#how">How it works</a>
          <a className="btn-pill" href="https://themshin.com/cravings/" target="_blank" rel="noopener">Open app →</a>
        </div>
      </nav>

      {/* ───── Hero ───── */}
      <section className="hero" id="start">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow">
            <span className="dot" /> A taste model that learns as you swipe
          </span>
          <h1 className="headline">
            {tweaks.headline1}<br />
            <span className="accent">{tweaks.headline2}</span>
          </h1>
          <p className="subhead">{tweaks.subhead}</p>

          <div className="cta-row">
            <a className="btn-pill lg" href="https://themshin.com/cravings/" target="_blank" rel="noopener">
              Start Swiping →
            </a>
            <a className="btn-pill lg ghost" href="#how">How it works</a>
          </div>
        </div>

        <div className="phone-stage">
          <span className="float-chip top-left">
            <span className="icon">✕</span>
            <span className="no" style={{ color: 'var(--reject-red)' }}>not today</span>
          </span>
          <span className="float-chip top-right">
            <span className="icon">✓</span>
            <span style={{ color: 'var(--like-green)' }}>yes!</span>
          </span>
          <span className="float-chip mid-left">
            <span>🌮</span>
            <span>Mexican night</span>
          </span>
          <span className="float-chip bot-right">
            <span>🍣</span>
            <span>Saved · 4.6★</span>
          </span>

          <div className="phone-tilt" style={{ boxShadow: 'var(--shadow-phone)', borderRadius: 48 }}>
            <IOSDevice width={300} height={640} dark={tweaks.theme === 'dark'}>
              <PhoneCard accent={tweaks.accent} />
            </IOSDevice>
          </div>
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section className="section" id="how">
        <p className="section-eyebrow">How it works</p>
        <h2 className="section-title">
          Three swipes in, the app <span className="accent">already knows you</span>.
        </h2>

        <div className="steps">
          <article className="step">
            <span className="step-num">01</span>
            <div className="step-glyph"><StepGlyph name="swipe" /></div>
            <h3 className="step-title">Swipe a card</h3>
            <p className="step-body">
              A dish, a cuisine, three taste tags. Right for yes, left for not today, hold ✕ for never. That's it — no
              forms, no preferences to fill out.
            </p>
            <div className="step-tagrow">
              <span className="step-tag">Spicy</span>
              <span className="step-tag">Saucy</span>
              <span className="step-tag">Veggie</span>
            </div>
          </article>

          <article className="step">
            <span className="step-num">02</span>
            <div className="step-glyph"><StepGlyph name="taste" /></div>
            <h3 className="step-title">Your taste model learns</h3>
            <p className="step-body">
              Behind each swipe, six taste dimensions move — spice, sweetness, richness, sauce, veggies, dairy. Your
              profile sharpens with every card.
            </p>
            <div className="step-tagrow">
              <span className="step-tag">Live updates</span>
              <span className="step-tag">No sign-up</span>
            </div>
          </article>

          <article className="step">
            <span className="step-num">03</span>
            <div className="step-glyph"><StepGlyph name="nearby" /></div>
            <h3 className="step-title">Eat tonight</h3>
            <p className="step-body">
              Every yes surfaces the nearest places that actually serve it — with ratings, addresses, and one tap to
              open Maps. No more group-chat debates.
            </p>
            <div className="step-tagrow">
              <span className="step-tag">Nearby</span>
              <span className="step-tag">4.5★+</span>
            </div>
          </article>
        </div>
      </section>

      {/* ───── CTA strip ───── */}
      <section className="cta-strip">
        <h2>Hungry now? Let's settle it.</h2>
        <a className="btn-pill lg" href="https://themshin.com/cravings/" target="_blank" rel="noopener">
          Open Cravings →
        </a>
      </section>

      {/* ───── Footer ───── */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="wordmark">
              <span className="mark"><Mark size={28} /></span>
              <span>Cravings</span>
            </div>
            <p className="footer-blurb">
              A taste-first food discovery app. One card at a time, learn your palate and find nearby spots that serve
              what you actually want.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#how">How it works</a></li>
                <li><a href="https://themshin.com/cravings/" target="_blank" rel="noopener">Open app</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://themshin.com/cravings/" target="_blank" rel="noopener">Live demo</a></li>
                <li><a href="mailto:hi@cravings.app">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="Privacy.html">Privacy</a></li>
                <li><a href="Terms.html">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bot">
          <span>© 2026 Cravings</span>
          <span className="made-with">Taste-first food discovery</span>
        </div>
      </footer>

      {/* ───── Tweaks ───── */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={v => setTweak('theme', v)}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark',  label: 'Dark'  },
            ]}
          />
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            onChange={v => setTweak('accent', v)}
            options={ACCENT_OPTIONS}
          />
        </TweakSection>
        <TweakSection label="Copy">
          <TweakText
            label="Headline line 1"
            value={tweaks.headline1}
            onChange={v => setTweak('headline1', v)}
          />
          <TweakText
            label="Headline line 2"
            value={tweaks.headline2}
            onChange={v => setTweak('headline2', v)}
          />
          <TweakText
            label="Subhead"
            value={tweaks.subhead}
            onChange={v => setTweak('subhead', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Landing />);
