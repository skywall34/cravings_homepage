// phone-card.jsx — auto-cycling Cravings swipe card for the iPhone frame
// Cycles through a few food cards on a timer with the real swipe-out animation.

const PC_CUISINE_EMOJI = {
  japanese: '🍣', mexican: '🌮', italian: '🍕', indian: '🥘',
  thai: '🦐', korean: '🥩', greek: '🫒',
};
const PC_CUISINE_BG = {
  japanese: '#FFF1EC', mexican: '#FFF9EC', italian: '#FFF8EC',
  indian: '#FFF3EC', thai: '#FFFAEC', korean: '#FFF2EC', greek: '#F5FFF0',
};

const PC_FOODS = [
  { name: 'Salmon Nigiri',       cuisine: 'japanese', tags: ['Rich', 'Fish'],          desc: 'Hand-formed rice, a thin slice of cured salmon. Mellow and clean.' },
  { name: 'Pollo Asado Tacos',   cuisine: 'mexican',  tags: ['Spicy', 'Saucy', 'Chicken'], desc: 'Charred chicken thighs, salsa verde, white onion, cilantro.' },
  { name: 'Cacio e Pepe',        cuisine: 'italian',  tags: ['Rich', 'Saucy', 'Dairy'],   desc: 'Tonnarelli, pecorino, cracked black pepper. All attitude.' },
  { name: 'Chicken Tikka Masala',cuisine: 'indian',   tags: ['Spicy', 'Rich', 'Saucy'],   desc: 'Marinated chicken in a creamy tomato curry, garam masala.' },
  { name: 'Bibimbap',            cuisine: 'korean',   tags: ['Veggie', 'Beef'],           desc: 'Hot stone bowl of rice, seasoned vegetables, a runny egg.' },
];

function PhoneCard({ accent = '#E85D04' }) {
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState('in'); // 'in' | 'out-right' | 'out-left'
  const [auto, setAuto] = React.useState(true);

  // Cycle through cards
  React.useEffect(() => {
    if (!auto) return;
    const dwell = 3200;
    const swipeMs = 420;
    const id = setTimeout(() => {
      // Pseudo-random: alternate right/left, bias right
      const dir = (idx % 3 === 2) ? 'out-left' : 'out-right';
      setPhase(dir);
      setTimeout(() => {
        setIdx(i => (i + 1) % PC_FOODS.length);
        setPhase('in');
      }, swipeMs);
    }, dwell);
    return () => clearTimeout(id);
  }, [idx, phase, auto]);

  const food = PC_FOODS[idx];
  const nextFood = PC_FOODS[(idx + 1) % PC_FOODS.length];
  const bg = PC_CUISINE_BG[food.cuisine];
  const emoji = PC_CUISINE_EMOJI[food.cuisine];

  // Progress dots (10 total)
  const TOTAL = 10;
  const progress = (idx + 1) % TOTAL || TOTAL;
  const dots = Array.from({ length: TOTAL }, (_, i) => i < progress - 1 ? 'past' : i === progress - 1 ? 'current' : 'future');

  const cardTransform =
    phase === 'out-right' ? 'translateX(135%) rotate(18deg)' :
    phase === 'out-left'  ? 'translateX(-135%) rotate(-18deg)' :
    'translateX(0) rotate(0deg)';

  const stamp = phase === 'out-right' ? 'LIKE' : phase === 'out-left' ? 'NOPE' : null;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--cream, #FFF8F0)',
      display: 'flex', flexDirection: 'column',
      padding: '52px 16px 28px',
      fontFamily: "'Nunito', system-ui, sans-serif",
      overflow: 'hidden',
    }}>
      {/* Mini app header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 4px', marginBottom: 18,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ color: accent, display: 'inline-flex' }}><Mark size={20} radius={6} /></span>
          <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: accent }}>Cravings</span>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--white, #fff)', border: '1.5px solid var(--border, #E8E0D8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: 'var(--fg-2, #6B6B6B)',
        }}>☰</div>
      </div>

      {/* Eyebrow */}
      <div style={{
        textAlign: 'center', marginBottom: 10,
        fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em',
        color: 'var(--fg-3, #B0A89E)', textTransform: 'uppercase',
      }}>
        Session · swipe {progress} of {TOTAL}
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 14 }}>
        {dots.map((s, i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: 3,
            transition: 'all 0.3s ease',
            background: s === 'current' ? accent : s === 'past' ? accent + '66' : 'var(--border, #E8E0D8)',
            transform: s === 'current' ? 'scale(1.3)' : 'scale(1)',
          }} />
        ))}
      </div>

      {/* Card stack */}
      <div style={{ position: 'relative', flex: 1, marginBottom: 12 }}>
        {/* Background peek of next card */}
        <div style={{
          position: 'absolute', inset: 0,
          background: PC_CUISINE_BG[nextFood.cuisine],
          borderRadius: 20,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          transform: 'scale(0.94) translateY(8px)',
          opacity: 0.6,
        }} />

        {/* Active card */}
        <div style={{
          position: 'absolute', inset: 0,
          background: bg, borderRadius: 20,
          boxShadow: '0 8px 32px rgba(232, 93, 4, 0.18), 0 2px 6px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          transform: cardTransform,
          opacity: phase === 'in' ? 1 : 0,
          transition: phase === 'in'
            ? 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease'
            : 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
        }}>
          <div style={{
            flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px 16px 14px',
          }}>
            <span style={{
              fontSize: 76, lineHeight: 1,
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.14))',
            }}>{emoji}</span>
          </div>
          <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
            <p style={{
              fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: accent, margin: 0,
            }}>{food.cuisine}</p>
            <h3 style={{
              fontSize: '1.35rem', fontWeight: 900, color: 'var(--fg-1, #1A1A1A)',
              lineHeight: 1.05, margin: 0, letterSpacing: '-0.02em',
            }}>{food.name}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {food.tags.map(t => (
                <span key={t} style={{
                  fontSize: '0.6rem', fontWeight: 700, padding: '3px 9px',
                  borderRadius: 20, border: '1.5px solid ' + accent + '33',
                  background: 'rgba(255,255,255,0.7)', color: accent, letterSpacing: '0.02em',
                }}>{t}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--fg-2, #6B6B6B)', lineHeight: 1.45, margin: '2px 0 0' }}>
              {food.desc}
            </p>
          </div>
          <div style={{ height: 1, background: 'var(--border, #E8E0D8)', margin: '0 18px' }} />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36,
            padding: '14px 0 12px',
          }}>
            <button style={{
              width: 52, height: 52, borderRadius: '50%',
              border: '2.5px solid #DC2626', background: 'rgba(220,38,38,0.06)',
              color: '#DC2626', fontSize: 20, fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(220,38,38,0.16)',
            }}>✕</button>
            <button style={{
              width: 52, height: 52, borderRadius: '50%',
              border: 'none', background: '#16A34A', color: 'white',
              fontSize: 20, fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(22,163,74,0.28)',
            }}>✓</button>
          </div>
          <p style={{
            textAlign: 'center', fontSize: '0.58rem', color: 'var(--fg-3, #B0A89E)',
            margin: '0 0 12px', letterSpacing: '0.02em',
          }}>← / → arrow keys · hold ✕ for Never</p>
        </div>

        {/* Stamp */}
        {stamp && (
          <div style={{
            position: 'absolute',
            top: 30, [stamp === 'LIKE' ? 'right' : 'left']: 18,
            fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.08em',
            padding: '6px 16px', borderRadius: 10,
            border: '3.5px solid ' + (stamp === 'LIKE' ? '#16A34A' : '#DC2626'),
            color: stamp === 'LIKE' ? '#16A34A' : '#DC2626',
            background: (stamp === 'LIKE' ? '#16A34A' : '#DC2626') + '0d',
            transform: 'rotate(' + (stamp === 'LIKE' ? 10 : -10) + 'deg)',
            zIndex: 10,
          }}>{stamp}</div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { PhoneCard });
