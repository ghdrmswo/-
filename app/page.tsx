'use client'

import React, { useState } from 'react'
import { StoryboardProvider, useStoryboard } from '@/components/StoryboardContext'
import ScenePanel from '@/components/ScenePanel'
import ExportButton from '@/components/ExportButton'

function StoryboardEditorContent() {
  const { currentStoryboard, createNewStoryboard, deleteStoryboard, addScene, getAllStoryboards } = useStoryboard()
  const [showNewStoryboardDialog, setShowNewStoryboardDialog] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [showNewSceneDialog, setShowNewSceneDialog] = useState(false)
  const [newSceneName, setNewSceneName] = useState('')
  const [newSceneDescription, setNewSceneDescription] = useState('')

  const handleCreateStoryboard = () => {
    if (newTitle.trim()) {
      createNewStoryboard(newTitle)
      setNewTitle('')
      setShowNewStoryboardDialog(false)
    }
  }

  const handleAddScene = () => {
    if (newSceneName.trim()) {
      addScene(newSceneName, newSceneDescription)
      setNewSceneName('')
      setNewSceneDescription('')
      setShowNewSceneDialog(false)
    }
  }

  const allStoryboards = getAllStoryboards()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">🎬 스토리보드 메이커</h1>
          <div className="flex gap-3">
            <ExportButton />
            <button
              onClick={() => setShowNewStoryboardDialog(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              새 스토리보드
            </button>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!currentStoryboard ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스토리보드를 시작하세요</h2>
            <p className="text-gray-600 mb-8">새 스토리보드를 만들거나 기존 스토리보드를 선택하세요.</p>

            {allStoryboards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {allStoryboards.map(sb => (
                  <div
                    key={sb.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{sb.title}</h3>
                    {sb.description && (
                      <p className="text-gray-600 text-sm mt-2">{sb.description}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-4">씬 {sb.scenes.length}개</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          // 현재 스토리보드 설정
                          const manager = (window as any).__manager
                          if (manager) manager.setCurrentStoryboard(sb)
                        }}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        열기
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`"${sb.title}"을(를) 삭제하시겠습니까?`)) {
                            deleteStoryboard(sb.id)
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowNewStoryboardDialog(true)}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-lg"
            >
              새 스토리보드 만들기
            </button>
          </div>
        ) : (
          <div>
            {/* 스토리보드 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{currentStoryboard.title}</h2>
                  {currentStoryboard.description && (
                    <p className="text-gray-600 mt-2">{currentStoryboard.description}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    // 돌아가기
                    window.location.reload()
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  돌아가기
                </button>
              </div>
            </div>

            {/* 씬 목록 */}
            {currentStoryboard.scenes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-500 mb-4">아직 씬이 없습니다.</p>
                <button
                  onClick={() => setShowNewSceneDialog(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  첫 번째 씬 추가
                </button>
              </div>
            ) : (
              <div className="space-y-6 mb-8">
                {currentStoryboard.scenes.map(scene => (
                  <ScenePanel key={scene.id} scene={scene} />
                ))}
              </div>
            )}

            {/* 씬 추가 버튼 */}
            {!showNewSceneDialog && (
              <button
                onClick={() => setShowNewSceneDialog(true)}
                className="w-full py-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 transition font-medium text-lg mb-8"
              >
                + 새로운 씬 추가
              </button>
            )}

            {/* 새 씬 추가 대화상자 */}
            {showNewSceneDialog && (
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">새로운 씬 추가</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">씬 이름</label>
                    <input
                      type="text"
                      value={newSceneName}
                      onChange={(e) => setNewSceneName(e.target.value)}
                      placeholder="예: 오프닝, 제품 소개, 클로징"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">설명 (선택)</label>
                    <textarea
                      value={newSceneDescription}
                      onChange={(e) => setNewSceneDescription(e.target.value)}
                      placeholder="이 씬에 대한 설명을 입력하세요..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddScene}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                    >
                      씬 추가
                    </button>
                    <button
                      onClick={() => {
                        setShowNewSceneDialog(false)
                        setNewSceneName('')
                        setNewSceneDescription('')
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 새 스토리보드 대화상자 */}
      {showNewStoryboardDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">새 스토리보드 만들기</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="스토리보드 제목을 입력하세요..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateStoryboard()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateStoryboard}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                만들기
              </button>
              <button
                onClick={() => {
                  setShowNewStoryboardDialog(false)
                  setNewTitle('')
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <StoryboardProvider>
      <StoryboardEditorContent />
    </StoryboardProvider>
  )
}
