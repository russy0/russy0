import { svgResponse, orbs, BG, ACCENT, MUTED, WHITE, FONT, FONT_SANS } from '../../../lib/svg'

const W = 800, H = 200

export async function GET() {
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${orbs(W, H)}

  <!-- tag -->
  <text x="32" y="44" ${FONT} font-size="11" fill="${ACCENT}" opacity="0.8" letter-spacing="2">// student developer</text>

  <!-- name -->
  <text x="32" y="90" ${FONT} font-size="42" fill="${WHITE}" font-weight="400" letter-spacing="-1">russy0</text>

  <!-- sub -->
  <text x="32" y="140" ${FONT_SANS} font-size="13" fill="${MUTED}">game dev / security / infra / web</text>

  <!-- links -->
  <text x="32" y="174" ${FONT} font-size="11" fill="${MUTED}">russy10370@gmail.com</text>
  <text x="220" y="174" ${FONT} font-size="11" fill="${MUTED}">discord: _russy1037_</text>
  <text x="400" y="174" ${FONT} font-size="11" fill="${MUTED}">github.com/russy0</text>

  <!-- accent line -->
  <line x1="32" y1="155" x2="${W - 32}" y2="155" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
</svg>`

  return svgResponse(svg)
}
