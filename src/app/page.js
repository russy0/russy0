export default function Page() {
  return (
    <div style={{ background: '#080B0F', minHeight: '100vh', padding: '40px 32px', fontFamily: 'monospace', color: '#E6EDF3' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8, color: '#fff' }}>readme-cards</h1>
      <p style={{ color: '#7D8590', marginBottom: 40, fontSize: 13 }}>russy0 GitHub README card server</p>
      <div>
        <p style={{ fontSize: 11, color: '#58A6FF', marginBottom: 8, letterSpacing: 2 }}>/api/card</p>
        <img src="/api/card" alt="card" style={{ display: 'block', maxWidth: '100%', borderRadius: 8 }} />
      </div>
    </div>
  )
}
