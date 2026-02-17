'use client'

import React, { useState } from 'react'
import { Shot, CompositionType, ShotSize, LensType, MovingType } from '@/types/storyboard'
import { useStoryboard } from './StoryboardContext'

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

interface ShotCardProps {
  shot: Shot
  sceneId: string
}

export default function ShotCard({ shot, sceneId }: ShotCardProps) {
  const { deleteShot, updateShot } = useStoryboard()
  const [isEditing, setIsEditing] = useState(false)
  const [composition, setComposition] = useState(shot.composition)
  const [size, setSize] = useState(shot.size)
  const [lens, setLens] = useState(shot.lens)
  const [moving, setMoving] = useState(shot.moving)
  const [description, setDescription] = useState(shot.description || '')

  const handleSave = () => {
    updateShot(sceneId, shot.id, {
      composition,
      size,
      lens,
      moving,
      description: description || undefined,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm('이 컷을 삭제하시겠습니까?')) {
      deleteShot(sceneId, shot.id)
    }
  }

  const compositionLabel = COMPOSITIONS.find(c => c.value === shot.composition)?.label
  const sizeLabel = SIZES.find(s => s.value === shot.size)?.label
  const lensLabel = LENSES.find(l => l.value === shot.lens)?.label
  const movingLabel = MOVINGS.find(m => m.value === shot.moving)?.label

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">컷 #{shot.shotNumber}</h4>
          {shot.description && !isEditing && (
            <p className="text-sm text-gray-600 mt-1">{shot.description}</p>
          )}
        </div>
        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              편집
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">구도</p>
              <p className={`composition-badge composition-${shot.composition}`}>
                {compositionLabel}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">사이즈</p>
              <p className="text-sm font-medium text-gray-700">{sizeLabel}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">렌즈</p>
              <p className="text-sm font-medium text-gray-700">{lensLabel}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">무빙</p>
              <p className="text-sm font-medium text-gray-700">{movingLabel}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
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
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setComposition(shot.composition)
                setSize(shot.size)
                setLens(shot.lens)
                setMoving(shot.moving)
                setDescription(shot.description || '')
              }}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
