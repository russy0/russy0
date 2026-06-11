export const FONT = `font-family="'JetBrains Mono', 'Courier New', monospace"`
export const FONT_SANS = `font-family="'Inter', 'Segoe UI', sans-serif"`

export const BG = '#080B0F'
export const GLASS = 'rgba(255,255,255,0.04)'
export const BORDER = 'rgba(255,255,255,0.09)'
export const ACCENT = '#58A6FF'
export const MUTED = '#7D8590'
export const TEXT = '#E6EDF3'
export const WHITE = '#ffffff'

export function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function svgResponse(svg) {
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}

export function glassRect({ x, y, w, h, r = 8, opacity = 0.04 }) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"
      fill="rgba(255,255,255,${opacity})" stroke="${BORDER}" stroke-width="1"/>
  `
}

export function orbs(w, h) {
  return `
    <defs>
      <filter id="blur1"><feGaussianBlur stdDeviation="60"/></filter>
      <filter id="blur2"><feGaussianBlur stdDeviation="45"/></filter>
    </defs>
    <circle cx="0" cy="0" r="280" fill="#1a3a5c" opacity="0.25" filter="url(#blur1)"/>
    <circle cx="${w}" cy="${h}" r="220" fill="#0d2035" opacity="0.22" filter="url(#blur1)"/>
    <circle cx="${w * 0.6}" cy="${h * 0.4}" r="150" fill="#112233" opacity="0.18" filter="url(#blur2)"/>
  `
}
