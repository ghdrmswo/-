import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Storyboard Maker',
  description: '영상 제작을 위한 스토리보드 작성 도구',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
