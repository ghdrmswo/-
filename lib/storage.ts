import { Storyboard } from '@/types/storyboard'

const STORAGE_KEY = 'storyboards'

/**
 * 로컬 스토리지에서 모든 스토리보드를 로드합니다.
 */
export function loadStoryboards(): Storyboard[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []

    const storyboards = JSON.parse(data) as Storyboard[]

    // Date 객체로 변환
    return storyboards.map(sb => ({
      ...sb,
      createdAt: new Date(sb.createdAt),
      updatedAt: new Date(sb.updatedAt),
      scenes: sb.scenes.map(scene => ({
        ...scene,
        createdAt: new Date(scene.createdAt),
        updatedAt: new Date(scene.updatedAt),
      })),
    }))
  } catch (error) {
    console.error('스토리보드 로드 실패:', error)
    return []
  }
}

/**
 * 스토리보드를 로컬 스토리지에 저장합니다.
 */
export function saveStoryboards(storyboards: Storyboard[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storyboards))
  } catch (error) {
    console.error('스토리보드 저장 실패:', error)
  }
}

/**
 * 스토리보드를 JSON 파일로 내보냅니다.
 */
export function exportStoryboard(storyboard: Storyboard): string {
  return JSON.stringify(storyboard, null, 2)
}

/**
 * JSON 데이터로부터 스토리보드를 가져옵니다.
 */
export function importStoryboard(jsonData: string): Storyboard | null {
  try {
    const data = JSON.parse(jsonData)
    // 기본 검증
    if (!data.id || !data.title || !Array.isArray(data.scenes)) {
      return null
    }

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      scenes: data.scenes.map((scene: any) => ({
        ...scene,
        createdAt: new Date(scene.createdAt),
        updatedAt: new Date(scene.updatedAt),
      })),
    }
  } catch (error) {
    console.error('스토리보드 가져오기 실패:', error)
    return null
  }
}
