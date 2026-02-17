'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { StoryboardManager } from '@/lib/storyboard'
import { Storyboard, Scene, Shot, CompositionType, ShotSize, LensType, MovingType } from '@/types/storyboard'

interface StoryboardContextType {
  manager: StoryboardManager
  currentStoryboard: Storyboard | null
  setCurrentStoryboard: (sb: Storyboard) => void
  createNewStoryboard: (title: string) => Storyboard
  getAllStoryboards: () => Storyboard[]
  deleteStoryboard: (id: string) => void
  addScene: (name: string, description?: string) => Scene | null
  deleteScene: (sceneId: string) => void
  addShot: (sceneId: string, data: {
    composition: CompositionType
    size: ShotSize
    lens: LensType
    moving: MovingType
    description?: string
    notes?: string
  }) => Shot | null
  deleteShot: (sceneId: string, shotId: string) => void
  updateShot: (sceneId: string, shotId: string, updates: Partial<{
    composition: CompositionType
    size: ShotSize
    lens: LensType
    moving: MovingType
    description: string
    notes: string
  }>) => Shot | null
}

const StoryboardContext = createContext<StoryboardContextType | undefined>(undefined)

export function StoryboardProvider({ children }: { children: React.ReactNode }) {
  const [manager] = useState(() => {
    if (typeof window !== 'undefined') {
      return new StoryboardManager(true)
    }
    return new StoryboardManager(false)
  })
  const [currentStoryboard, setCurrentStoryboard] = useState<Storyboard | null>(null)
  const [, setRefresh] = useState({})

  const refresh = () => setRefresh({})

  const createNewStoryboard = useCallback((title: string) => {
    const sb = manager.createStoryboard(title)
    setCurrentStoryboard(sb)
    refresh()
    return sb
  }, [manager])

  const getAllStoryboards = useCallback(() => {
    return manager.getAllStoryboards()
  }, [manager])

  const deleteStoryboard = useCallback((id: string) => {
    manager.deleteStoryboard(id)
    if (currentStoryboard?.id === id) {
      setCurrentStoryboard(null)
    }
    refresh()
  }, [manager, currentStoryboard])

  const addScene = useCallback((name: string, description?: string) => {
    if (!currentStoryboard) return null
    const scene = manager.addScene(currentStoryboard.id, name, description)
    refresh()
    return scene
  }, [manager, currentStoryboard])

  const deleteScene = useCallback((sceneId: string) => {
    if (!currentStoryboard) return
    manager.deleteScene(currentStoryboard.id, sceneId)
    refresh()
  }, [manager, currentStoryboard])

  const addShot = useCallback((sceneId: string, data: {
    composition: CompositionType
    size: ShotSize
    lens: LensType
    moving: MovingType
    description?: string
    notes?: string
  }) => {
    if (!currentStoryboard) return null
    const shot = manager.addShot(currentStoryboard.id, sceneId, data)
    refresh()
    return shot
  }, [manager, currentStoryboard])

  const deleteShot = useCallback((sceneId: string, shotId: string) => {
    if (!currentStoryboard) return
    manager.deleteShot(currentStoryboard.id, sceneId, shotId)
    refresh()
  }, [manager, currentStoryboard])

  const updateShot = useCallback((sceneId: string, shotId: string, updates: Partial<{
    composition: CompositionType
    size: ShotSize
    lens: LensType
    moving: MovingType
    description: string
    notes: string
  }>) => {
    if (!currentStoryboard) return null
    const shot = manager.updateShot(currentStoryboard.id, sceneId, shotId, updates)
    refresh()
    return shot
  }, [manager, currentStoryboard])

  const value: StoryboardContextType = {
    manager,
    currentStoryboard,
    setCurrentStoryboard,
    createNewStoryboard,
    getAllStoryboards,
    deleteStoryboard,
    addScene,
    deleteScene,
    addShot,
    deleteShot,
    updateShot,
  }

  return (
    <StoryboardContext.Provider value={value}>
      {children}
    </StoryboardContext.Provider>
  )
}

export function useStoryboard() {
  const context = useContext(StoryboardContext)
  if (!context) {
    throw new Error('useStoryboard must be used within StoryboardProvider')
  }
  return context
}
