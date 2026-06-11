import { svgResponse, orbs, glassRect, escapeXml, BG, ACCENT, MUTED, WHITE, TEXT, FONT, FONT_SANS } from '../../../lib/svg'

const W = 800
const USERNAME = 'russy0'

const AREAS = [
  { title: 'Game Dev',       desc: 'Unity · FMOD · visual novel\nrhythm game · narrative systems' },
  { title: 'Security / CTF', desc: 'web · binary exploitation\nreversing · DIMI CTF' },
  { title: 'Infra',          desc: 'homelab · OpenWrt · OCI\nTrueNAS · VPN · VLAN' },
  { title: 'Web',            desc: 'PHP · Go · REST\nWebSocket · Discord bot' },
]

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
      { name: 'Unreal Engine', color: '#8a8a8a' },
    ],
  },
  {
    label: 'Infra & Tools',
    items: [
      { name: 'Linux',     color: '#FCC624' },
      { name: 'Nginx',     color: '#009639' },
      { name: 'MariaDB',   color: '#6495ED' },
      { name: 'Docker',    color: '#2496ED' },
      { name: 'WireGuard', color: '#cc3333' },
      { name: 'Redis',     color: '#EE4444' },
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

async function fetchStats() {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    })
    const data = await res.json()
    return {
      repos: data.public_repos ?? '—',
      followers: data.followers ?? '—',
    }
  } catch {
    return { repos: '—', followers: '—' }
  }
}

function divider(y) {
  return `<line x1="32" y1="${y}" x2="${W - 32}" y2="${y}" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`
}

function sectionLabel(text, y) {
  return `<text x="32" y="${y}" ${FONT} font-size="10" fill="${MUTED}" letter-spacing="3" opacity="0.6">${escapeXml(text)}</text>`
}

export async function GET() {
  const { repos, followers } = await fetchStats()

  let elements = ''
  let y = 0

  // ─── HERO ──────────────────────────────────────────────────────────────────
  elements += `<text x="32" y="${y + 44}" ${FONT} font-size="11" fill="${ACCENT}" opacity="0.8" letter-spacing="2">// student developer</text>`
  elements += `<text x="32" y="${y + 90}" ${FONT} font-size="42" fill="${WHITE}" font-weight="400" letter-spacing="-1">russy0</text>`
  elements += `<text x="32" y="${y + 120}" ${FONT_SANS} font-size="13" fill="${MUTED}">game dev / security / infra / web</text>`
  elements += divider(y + 138)
  elements += `<text x="32"  y="${y + 154}" ${FONT} font-size="11" fill="${MUTED}">russy10370@gmail.com</text>`
  elements += `<text x="220" y="${y + 154}" ${FONT} font-size="11" fill="${MUTED}">discord: _russy1037_</text>`
  elements += `<text x="400" y="${y + 154}" ${FONT} font-size="11" fill="${MUTED}">github.com/russy0</text>`
  y += 200

  // ─── STATS ─────────────────────────────────────────────────────────────────
  elements += divider(y)
  y += 20
  elements += sectionLabel('GITHUB', y + 8)
  y += 24

  const STATS = [
    { label: 'Public Repos', value: String(repos) },
    { label: 'Followers',    value: String(followers) },
    { label: 'Username',     value: USERNAME },
    { label: 'Focus',        value: 'game dev / CTF' },
  ]
  const sCardW = (W - 64 - 12 * 3) / 4
  const sCardH = 68

  STATS.forEach((stat, i) => {
    const x = 32 + i * (sCardW + 12)
    elements += glassRect({ x, y, w: sCardW, h: sCardH, r: 8, opacity: 0.05 })
    elements += `<text x="${x + sCardW / 2}" y="${y + 26}" ${FONT} font-size="18" fill="${WHITE}" font-weight="400" text-anchor="middle">${escapeXml(stat.value)}</text>`
    elements += `<text x="${x + sCardW / 2}" y="${y + 46}" ${FONT_SANS} font-size="11" fill="${MUTED}" text-anchor="middle">${escapeXml(stat.label)}</text>`
  })
  y += sCardH + 20

  // ─── AREAS ─────────────────────────────────────────────────────────────────
  elements += divider(y)
  y += 20
  elements += sectionLabel('AREAS', y + 8)
  y += 24

  const aCardW = (W - 64 - 12 * 3) / 4
  const aCardH = 80

  AREAS.forEach((area, i) => {
    const x = 32 + i * (aCardW + 12)
    elements += glassRect({ x, y, w: aCardW, h: aCardH, r: 8, opacity: 0.05 })
    elements += `<text x="${x + 14}" y="${y + 22}" ${FONT} font-size="12" fill="${WHITE}" font-weight="500">${escapeXml(area.title)}</text>`
    area.desc.split('\n').forEach((line, li) => {
      elements += `<text x="${x + 14}" y="${y + 40 + li * 16}" ${FONT_SANS} font-size="11" fill="${MUTED}">${escapeXml(line)}</text>`
    })
  })
  y += aCardH + 20

  // ─── TECH STACK ────────────────────────────────────────────────────────────
  elements += divider(y)
  y += 20
  elements += sectionLabel('TECH STACK', y + 8)
  y += 36

  for (const row of layoutGroups()) {
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
  ${elements}
</svg>`

  return svgResponse(svg)
}
