'use client'

import React, { useState } from 'react'
import { Scene, CompositionType, ShotSize, LensType, MovingType } from '@/types/storyboard'
import { useStoryboard } from './StoryboardContext'
import ShotCard from './ShotCard'

const COMPOSITIONS: { value: CompositionType; label: string }[] = [
  { value: 'high_angle', label: '하이앵글 (위에서 내려다보기)' },
  { value: 'eye_level', label: '아이레벨 (눈높이)' },
  { value: 'low_angle', label: '로우앵글 (아래에서 올려다보기)' },
  { value: 'dutch_angle', label: '더치앵글 (기울어진 각도)' },
]

const SIZES: { value: ShotSize; label: string }[] = [
  { value: 'long_shot', label: 'LS - 롱샷 (전체 배경 포함)' },
  { value: 'full_shot', label: 'FS - 풀샷 (인물 전신)' },
  { value: 'knee_shot', label: 'KS - 니샷 (무릎 위)' },
  { value: 'middle_shot', label: 'MS - 미들샷 (허리 위)' },
  { value: 'bust_shot', label: 'BS - 바스트샷 (가슴 위)' },
  { value: 'head_shoulder', label: 'HS - 헤드 숄더 (머리&어깨)' },
  { value: 'head_close_up', label: 'HCU - 헤드 클로즈업 (얼굴만)' },
  { value: 'object_close_up', label: 'OCU - 물체 클로즈업' },
]

const LENSES: { value: LensType; label: string }[] = [
  { value: '24mm', label: '24mm (광각)' },
  { value: '35mm', label: '35mm' },
  { value: '50mm', label: '50mm (표준)' },
  { value: '85mm', label: '85mm (포트레이트)' },
  { value: '105mm', label: '105mm' },
  { value: '200mm', label: '200mm (망원)' },
]

const MOVINGS: { value: MovingType; label: string }[] = [
  { value: 'static', label: '스태틱 (움직임 없음)' },
  { value: 'pan', label: '팬 (좌우 움직임)' },
  { value: 'tilt', label: '틸트 (위아래 움직임)' },
  { value: 'dolly_in', label: '돌리 인 (전진 움직임)' },
  { value: 'dolly_out', label: '돌리 아웃 (후진 움직임)' },
  { value: 'crane', label: '크레인 (높낮이 움직임)' },
  { value: 'zoom', label: '줌' },
  { value: 'tracking', label: '트래킹 (따라감)' },
  { value: 'handheld', label: '핸드헬드 (손 흔들림)' },
]

interface ScenePanelProps {
  scene: Scene
}

export default function ScenePanel({ scene }: ScenePanelProps) {
  const { deleteScene, addShot } = useStoryboard()
  const [isAddingShot, setIsAddingShot] = useState(false)
  const [composition, setComposition] = useState<CompositionType>('eye_level')
  const [size, setSize] = useState<ShotSize>('full_shot')
  const [lens, setLens] = useState<LensType>('50mm')
  const [moving, setMoving] = useState<MovingType>('static')

  // 리셋 시 기본값으로 돌아가기
  const resetForm = () => {
    setComposition('eye_level')
    setSize('full_shot')
    setLens('50mm')
    setMoving('static')
    setDescription('')
  }
  const [description, setDescription] = useState('')

  const handleAddShot = () => {
    addShot(scene.id, {
      composition,
      size,
      lens,
      moving,
      description: description || undefined,
    })
    setIsAddingShot(false)
    resetForm()
  }

  const handleDeleteScene = () => {
    if (confirm(`씬 "${scene.name}"을(를) 삭제하시겠습니까?`)) {
      deleteScene(scene.id)
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-lg overflow-hidden">
      {/* 씬 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">씬 #{scene.sceneNumber}</h3>
            <p className="text-blue-100 mt-1">{scene.name}</p>
            {scene.description && (
              <p className="text-blue-50 text-sm mt-2">{scene.description}</p>
            )}
          </div>
          <button
            onClick={handleDeleteScene}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium"
          >
            씬 삭제
          </button>
        </div>
      </div>

      {/* 컷 목록 */}
      <div className="p-6">
        {scene.shots.length === 0 ? (
          <p className="text-center text-gray-500 py-8">컷이 없습니다. 아래에서 컷을 추가하세요.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {scene.shots.map(shot => (
              <ShotCard key={shot.id} shot={shot} sceneId={scene.id} />
            ))}
          </div>
        )}

        {/* 컷 추가 섹션 */}
        {!isAddingShot ? (
          <button
            onClick={() => setIsAddingShot(true)}
            className="w-full py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition font-medium"
          >
            + 새로운 컷 추가
          </button>
        ) : (
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-4">새로운 컷 추가</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">구도</label>
                <select
                  value={composition}
                  onChange={(e) => setComposition(e.target.value as CompositionType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {COMPOSITIONS.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">사이즈</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as ShotSize)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SIZES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">렌즈</label>
                <select
                  value={lens}
                  onChange={(e) => setLens(e.target.value as LensType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LENSES.map(l => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">무빙</label>
                <select
                  value={moving}
                  onChange={(e) => setMoving(e.target.value as MovingType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {MOVINGS.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">설명 (선택)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="이 컷에 대한 설명을 입력하세요..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddShot}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
              >
                컷 추가
              </button>
              <button
                onClick={() => setIsAddingShot(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
