// marks.jsx — geometric brand mark + step glyphs (no emoji)
// All shapes are simple: rounded rects, lines, circles. Color via currentColor.

// Brand mark: a rounded "card" tile with a swipe-right chevron.
function Mark({ size = 28, radius, style }) {
  const r = radius != null ? radius : Math.round(size * 0.3);
  return (
    <svg
      width={size} height={size} viewBox="0 0 32 32"
      style={{ display: 'block', flex: '0 0 auto', ...style }}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="27" height="27" rx={r} fill="currentColor" />
      <path
        d="M13 10.5 L18.5 16 L13 21.5"
        fill="none" stroke="#fff" strokeWidth="3.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// Step glyphs — drawn inside a tinted tile by the consumer.
function StepGlyph({ name, size = 30 }) {
  const common = {
    width: size, height: size, viewBox: '0 0 28 28',
    fill: 'none', stroke: 'currentColor', strokeWidth: 2.4,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { display: 'block' }, 'aria-hidden': true,
  };
  if (name === 'swipe') {
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="13" height="18" rx="3" />
        <path d="M20 14 h4.5" />
        <path d="M21.8 11 L25 14 L21.8 17" />
      </svg>
    );
  }
  if (name === 'taste') {
    return (
      <svg {...common} strokeWidth="2.8">
        <path d="M6.5 22 V13" />
        <path d="M13 22 V6.5" />
        <path d="M19.5 22 V16" />
        <path d="M25 22 V10" />
      </svg>
    );
  }
  // 'nearby' — radar ring + center dot
  return (
    <svg {...common}>
      <circle cx="14" cy="14" r="8.5" />
      <circle cx="14" cy="14" r="2.4" fill="currentColor" stroke="none" />
      <path d="M14 3.5 V5.5 M14 22.5 V24.5 M3.5 14 H5.5 M22.5 14 H24.5" />
    </svg>
  );
}

Object.assign(window, { Mark, StepGlyph });
