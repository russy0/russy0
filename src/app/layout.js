export const metadata = {
  title: 'readme-cards',
  description: 'russy0 GitHub README card server',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
