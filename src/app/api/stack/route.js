import { svgResponse, orbs, glassRect, escapeXml, BG, MUTED, TEXT, FONT } from '../../../lib/svg'

const W = 800

const GROUPS = [
  {
    label: 'Languages',
    items: [
      { name: 'C',      color: '#A8B9CC' },
      { name: 'C++',    color: '#00599C' },
      { name: 'C#',     color: '#239120' },
      { name: 'Go',     color: '#00ADD8' },
      { name: 'Python', color: '#3776AB' },
      { name: 'PHP',    color: '#777BB4' },
      { name: 'Java',   color: '#ED8B00' },
    ],
  },
  {
    label: 'Engines',
    items: [
      { name: 'Unity',         color: '#cccccc' },
    ],
  },
  {
    label: 'Infra & Tools',
    items: [
      { name: 'Linux',     color: '#FCC624' },
      { name: 'Nginx',     color: '#009639' },
      { name: 'MariaDB',   color: '#6495ED' },
      { name: 'Docker',    color: '#2496ED' },
    ],
  },
]

const ITEM_H = 28
const ITEM_PAD_X = 14
const ITEM_PAD_LEFT = 10
const DOT_W = 3
const GAP = 8
const CHAR_W = 7.2

function measureItem(name) {
  return DOT_W + 8 + name.length * CHAR_W + ITEM_PAD_X + ITEM_PAD_LEFT
}

function layoutGroups() {
  const CONTENT_W = W - 64
  const rows = []

  for (const group of GROUPS) {
    rows.push({ type: 'label', text: group.label })
    let rowItems = []
    let rowW = 0
    for (const item of group.items) {
      const iw = measureItem(item.name)
      if (rowW + iw > CONTENT_W && rowItems.length > 0) {
        rows.push({ type: 'items', items: rowItems })
        rowItems = []
        rowW = 0
      }
      rowItems.push({ ...item, w: iw })
      rowW += iw + GAP
    }
    if (rowItems.length) rows.push({ type: 'items', items: rowItems })
    rows.push({ type: 'gap' })
  }
  return rows
}

export async function GET() {
  const rows = layoutGroups()

  let y = 56
  let elements = ''

  for (const row of rows) {
    if (row.type === 'label') {
      elements += `<text x="32" y="${y}" ${FONT} font-size="10" fill="${MUTED}" letter-spacing="2" opacity="0.8">${escapeXml(row.text.toUpperCase())}</text>`
      y += 20
    } else if (row.type === 'items') {
      let x = 32
      for (const item of row.items) {
        elements += glassRect({ x, y: y - 20, w: item.w, h: ITEM_H, r: 6 })
        elements += `<rect x="${x + ITEM_PAD_LEFT}" y="${y - 13}" width="${DOT_W}" height="18" rx="2" fill="${item.color}"/>`
        elements += `<text x="${x + ITEM_PAD_LEFT + DOT_W + 8}" y="${y}" ${FONT} font-size="12" fill="${TEXT}">${escapeXml(item.name)}</text>`
        x += item.w + GAP
      }
      y += ITEM_H + GAP
    } else if (row.type === 'gap') {
      y += 12
    }
  }

  const H = y + 24

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${orbs(W, H)}

  <!-- section label -->
  <text x="32" y="30" ${FONT} font-size="10" fill="${MUTED}" letter-spacing="3" opacity="0.6">TECH STACK</text>
  <line x1="120" y1="24" x2="${W - 32}" y2="24" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  ${elements}
</svg>`

  return svgResponse(svg)
}
