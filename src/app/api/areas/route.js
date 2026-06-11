import { svgResponse, orbs, glassRect, escapeXml, BG, MUTED, WHITE, FONT, FONT_SANS } from '../../../lib/svg'

const W = 800, H = 160

const AREAS = [
  { title: 'Game Dev',       desc: 'Unity \nrhythm game · narrative systems' },
  { title: 'Infra',          desc: 'homelab · OpenWrt · VPS · OCI' },
  { title: 'Web',            desc: 'PHP · Go · REST\nWebSocket' },
]

export async function GET() {
  const PAD = 32
  const GAP = 12
  const cardW = (W - PAD * 2 - GAP * 3) / 4

  let cards = ''
  AREAS.forEach((area, i) => {
    const x = PAD + i * (cardW + GAP)
    const y = 44
    const h = H - 44 - 16

    cards += glassRect({ x, y, w: cardW, h, r: 8, opacity: 0.05 })
    cards += `<text x="${x + 14}" y="${y + 26}" ${FONT} font-size="12" fill="${WHITE}" font-weight="500">${escapeXml(area.title)}</text>`

    const lines = area.desc.split('\n')
    lines.forEach((line, li) => {
      cards += `<text x="${x + 14}" y="${y + 46 + li * 16}" ${FONT_SANS} font-size="11" fill="${MUTED}">${escapeXml(line)}</text>`
    })
  })

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${orbs(W, H)}

  <text x="32" y="24" ${FONT} font-size="10" fill="${MUTED}" letter-spacing="3" opacity="0.6">AREAS</text>
  <line x1="80" y1="18" x2="${W - 32}" y2="18" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  ${cards}
</svg>`

  return svgResponse(svg)
}
