import {
  Storyboard,
  Scene,
  Shot,
  CompositionType,
  ShotSize,
  LensType,
  MovingType,
} from '../types/storyboard';
import { loadStoryboards, saveStoryboards } from './storage';

export class StoryboardManager {
  private storyboards: Map<string, Storyboard> = new Map();
  private autoSave = true;

  constructor(autoSave = true) {
    this.autoSave = autoSave;
    this.loadFromStorage();
  }

  /**
   * 로컬 스토리지에서 스토리보드를 로드합니다.
   */
  private loadFromStorage(): void {
    const stored = loadStoryboards();
    stored.forEach(sb => {
      this.storyboards.set(sb.id, sb);
    });
  }

  /**
   * 로컬 스토리지에 저장합니다.
   */
  private persistToStorage(): void {
    if (this.autoSave) {
      saveStoryboards(this.getAllStoryboards());
    }
  }

  /**
   * 새로운 스토리보드를 생성합니다.
   */
  createStoryboard(title: string, description?: string): Storyboard {
    const storyboard: Storyboard = {
      id: this.generateId(),
      title,
      description,
      scenes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.storyboards.set(storyboard.id, storyboard);
    this.persistToStorage();
    return storyboard;
  }

  /**
   * 스토리보드에 씬을 추가합니다.
   */
  addScene(
    storyboardId: string,
    name: string,
    description?: string
  ): Scene {
    const storyboard = this.getStoryboard(storyboardId);

    const scene: Scene = {
      id: this.generateId(),
      sceneNumber: storyboard.scenes.length + 1,
      name,
      description,
      shots: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    storyboard.scenes.push(scene);
    this.updateStoryboardTimestamp(storyboardId);
    this.persistToStorage();
    return scene;
  }

  /**
   * 스토리보드에서 씬을 삭제합니다.
   */
  deleteScene(storyboardId: string, sceneId: string): void {
    const storyboard = this.getStoryboard(storyboardId);
    const sceneIndex = storyboard.scenes.findIndex((s) => s.id === sceneId);

    if (sceneIndex === -1) {
      throw new Error('Scene not found');
    }

    storyboard.scenes.splice(sceneIndex, 1);

    // 씬 번호 재정렬
    storyboard.scenes.forEach((scene, index) => {
      scene.sceneNumber = index + 1;
    });

    this.updateStoryboardTimestamp(storyboardId);
    this.persistToStorage();
  }

  /**
   * 씬에 컷을 추가합니다.
   */
  addShot(
    storyboardId: string,
    sceneId: string,
    shotData: {
      composition: CompositionType;
      size: ShotSize;
      lens: LensType;
      moving: MovingType;
      description?: string;
      notes?: string;
    }
  ): Shot {
    const storyboard = this.getStoryboard(storyboardId);
    const scene = this.getScene(storyboard, sceneId);

    const shot: Shot = {
      id: this.generateId(),
      shotNumber: scene.shots.length + 1,
      composition: shotData.composition,
      size: shotData.size,
      lens: shotData.lens,
      moving: shotData.moving,
      description: shotData.description,
      notes: shotData.notes,
    };

    scene.shots.push(shot);
    this.updateSceneTimestamp(scene);
    this.updateStoryboardTimestamp(storyboardId);
    this.persistToStorage();
    return shot;
  }

  /**
   * 씬에서 컷을 삭제합니다.
   */
  deleteShot(
    storyboardId: string,
    sceneId: string,
    shotId: string
  ): void {
    const storyboard = this.getStoryboard(storyboardId);
    const scene = this.getScene(storyboard, sceneId);

    const shotIndex = scene.shots.findIndex((s) => s.id === shotId);

    if (shotIndex === -1) {
      throw new Error('Shot not found');
    }

    scene.shots.splice(shotIndex, 1);

    // 컷 번호 재정렬
    scene.shots.forEach((shot, index) => {
      shot.shotNumber = index + 1;
    });

    this.updateSceneTimestamp(scene);
    this.updateStoryboardTimestamp(storyboardId);
    this.persistToStorage();
  }

  /**
   * 컷의 속성을 업데이트합니다.
   */
  updateShot(
    storyboardId: string,
    sceneId: string,
    shotId: string,
    updates: Partial<{
      composition: CompositionType;
      size: ShotSize;
      lens: LensType;
      moving: MovingType;
      description: string;
      notes: string;
    }>
  ): Shot {
    const storyboard = this.getStoryboard(storyboardId);
    const scene = this.getScene(storyboard, sceneId);
    const shot = this.getShot(scene, shotId);

    // 제공된 필드만 업데이트
    if (updates.composition !== undefined)
      shot.composition = updates.composition;
    if (updates.size !== undefined) shot.size = updates.size;
    if (updates.lens !== undefined) shot.lens = updates.lens;
    if (updates.moving !== undefined) shot.moving = updates.moving;
    if (updates.description !== undefined)
      shot.description = updates.description;
    if (updates.notes !== undefined) shot.notes = updates.notes;

    this.updateSceneTimestamp(scene);
    this.updateStoryboardTimestamp(storyboardId);
    this.persistToStorage();
    return shot;
  }

  /**
   * 스토리보드를 조회합니다.
   */
  getStoryboard(id: string): Storyboard {
    const storyboard = this.storyboards.get(id);
    if (!storyboard) {
      throw new Error('Storyboard not found');
    }
    return storyboard;
  }

  /**
   * 모든 스토리보드를 조회합니다.
   */
  getAllStoryboards(): Storyboard[] {
    return Array.from(this.storyboards.values());
  }

  /**
   * 스토리보드를 삭제합니다.
   */
  deleteStoryboard(id: string): void {
    this.storyboards.delete(id);
    this.persistToStorage();
  }

  // Private 헬퍼 메소드들
  private getScene(storyboard: Storyboard, sceneId: string): Scene {
    const scene = storyboard.scenes.find((s) => s.id === sceneId);
    if (!scene) {
      throw new Error('Scene not found');
    }
    return scene;
  }

  private getShot(scene: Scene, shotId: string): Shot {
    const shot = scene.shots.find((s) => s.id === shotId);
    if (!shot) {
      throw new Error('Shot not found');
    }
    return shot;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private updateSceneTimestamp(scene: Scene): void {
    scene.updatedAt = new Date();
  }

  private updateStoryboardTimestamp(storyboardId: string): void {
    const storyboard = this.storyboards.get(storyboardId);
    if (storyboard) {
      storyboard.updatedAt = new Date();
    }
  }
}
