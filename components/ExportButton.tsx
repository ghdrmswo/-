'use client'

import { useStoryboard } from './StoryboardContext'
import { exportStoryboard } from '@/lib/storage'

export default function ExportButton() {
  const { currentStoryboard } = useStoryboard()

  const handleExportJSON = () => {
    if (!currentStoryboard) {
      alert('스토리보드를 선택해주세요.')
      return
    }

    const json = exportStoryboard(currentStoryboard)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentStoryboard.title}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!currentStoryboard) return null

  return (
    <button
      onClick={handleExportJSON}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
      title="스토리보드를 JSON 파일로 내보냅니다."
    >
      📥 내보내기
    </button>
  )
}
