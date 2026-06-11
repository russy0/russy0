import { svgResponse, orbs, glassRect, escapeXml, BG, MUTED, WHITE, FONT, FONT_SANS } from '../../../lib/svg'

const W = 800, H = 130
const USERNAME = 'russy0'

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

export async function GET() {
  const { repos, followers } = await fetchStats()

  const STATS = [
    { label: 'Public Repos', value: String(repos) },
    { label: 'Followers',    value: String(followers) },
    { label: 'Username',     value: USERNAME },
    { label: 'Focus',        value: 'game dev / CTF' },
  ]

  const PAD = 32
  const GAP = 12
  const cardW = (W - PAD * 2 - GAP * 3) / 4

  let cards = ''
  STATS.forEach((stat, i) => {
    const x = PAD + i * (cardW + GAP)
    const y = 44
    const h = H - 44 - 16

    cards += glassRect({ x, y, w: cardW, h, r: 8, opacity: 0.05 })
    cards += `<text x="${x + cardW / 2}" y="${y + 30}" ${FONT} font-size="20" fill="${WHITE}" font-weight="400" text-anchor="middle">${escapeXml(stat.value)}</text>`
    cards += `<text x="${x + cardW / 2}" y="${y + 48}" ${FONT_SANS} font-size="11" fill="${MUTED}" text-anchor="middle">${escapeXml(stat.label)}</text>`
  })

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${orbs(W, H)}

  <text x="32" y="24" ${FONT} font-size="10" fill="${MUTED}" letter-spacing="3" opacity="0.6">GITHUB</text>
  <line x1="84" y1="18" x2="${W - 32}" y2="18" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  ${cards}
</svg>`

  return svgResponse(svg)
}
