import { StoryboardManager } from './storyboard';
import { Storyboard, Scene, Shot } from '../types/storyboard';

describe('StoryboardManager', () => {
  let manager: StoryboardManager;

  beforeEach(() => {
    manager = new StoryboardManager();
  });

  // 스토리보드 생성 테스트
  describe('createStoryboard', () => {
    it('should create a new storyboard with given title', () => {
      const title = 'Product Commercial';
      const storyboard = manager.createStoryboard(title, 'A 30-second commercial');

      expect(storyboard.title).toBe(title);
      expect(storyboard.scenes).toEqual([]);
      expect(storyboard.id).toBeDefined();
      expect(storyboard.createdAt).toBeInstanceOf(Date);
    });

    it('should assign unique ID to each storyboard', () => {
      const sb1 = manager.createStoryboard('SB1');
      const sb2 = manager.createStoryboard('SB2');

      expect(sb1.id).not.toBe(sb2.id);
    });
  });

  // 씬 추가 테스트
  describe('addScene', () => {
    it('should add a scene to storyboard', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1', 'Indoor setting');

      expect(scene.sceneNumber).toBe(1);
      expect(scene.name).toBe('Scene 1');
      expect(scene.shots).toEqual([]);
      expect(storyboard.scenes).toContain(scene);
    });

    it('should increment scene number correctly', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene1 = manager.addScene(storyboard.id, 'Scene 1');
      const scene2 = manager.addScene(storyboard.id, 'Scene 2');

      expect(scene1.sceneNumber).toBe(1);
      expect(scene2.sceneNumber).toBe(2);
    });

    it('should throw error when storyboard not found', () => {
      expect(() => {
        manager.addScene('nonexistent-id', 'Scene');
      }).toThrow('Storyboard not found');
    });
  });

  // 씬 삭제 테스트
  describe('deleteScene', () => {
    it('should remove scene from storyboard', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1');

      manager.deleteScene(storyboard.id, scene.id);

      expect(storyboard.scenes).not.toContain(scene);
    });

    it('should renumber remaining scenes', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene1 = manager.addScene(storyboard.id, 'Scene 1');
      const scene2 = manager.addScene(storyboard.id, 'Scene 2');
      const scene3 = manager.addScene(storyboard.id, 'Scene 3');

      manager.deleteScene(storyboard.id, scene2.id);

      expect(storyboard.scenes[0].sceneNumber).toBe(1);
      expect(storyboard.scenes[1].sceneNumber).toBe(2);
    });
  });

  // 컷 추가 테스트
  describe('addShot', () => {
    it('should add a shot to a scene with moving type', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1');

      const shot = manager.addShot(storyboard.id, scene.id, {
        composition: 'eye_level',
        size: 'full_shot',
        lens: '35mm',
        moving: 'static',
      });

      expect(shot.shotNumber).toBe(1);
      expect(shot.composition).toBe('eye_level');
      expect(shot.size).toBe('full_shot');
      expect(shot.lens).toBe('35mm');
      expect(shot.moving).toBe('static');
      expect(scene.shots).toContain(shot);
    });

    it('should increment shot number within scene', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1');

      const shot1 = manager.addShot(storyboard.id, scene.id, {
        composition: 'eye_level',
        size: 'full_shot',
        lens: '35mm',
        moving: 'static',
      });

      const shot2 = manager.addShot(storyboard.id, scene.id, {
        composition: 'close_up',
        size: 'head_shoulder',
        lens: '85mm',
        moving: 'zoom',
      });

      expect(shot1.shotNumber).toBe(1);
      expect(shot2.shotNumber).toBe(2);
    });

    it('should throw error when scene not found', () => {
      const storyboard = manager.createStoryboard('Test SB');

      expect(() => {
        manager.addShot(storyboard.id, 'nonexistent-scene', {
          composition: 'eye_level',
          size: 'full_shot',
          lens: '35mm',
          moving: 'static',
        });
      }).toThrow('Scene not found');
    });
  });

  // 컷 삭제 테스트
  describe('deleteShot', () => {
    it('should remove shot from scene', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1');
      const shot = manager.addShot(storyboard.id, scene.id, {
        composition: 'eye_level',
        size: 'full_shot',
        lens: '35mm',
        moving: 'static',
      });

      manager.deleteShot(storyboard.id, scene.id, shot.id);

      expect(scene.shots).not.toContain(shot);
    });

    it('should renumber remaining shots', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1');

      const shot1 = manager.addShot(storyboard.id, scene.id, {
        composition: 'eye_level',
        size: 'full_shot',
        lens: '35mm',
        moving: 'static',
      });

      const shot2 = manager.addShot(storyboard.id, scene.id, {
        composition: 'close_up',
        size: 'head_shoulder',
        lens: '85mm',
        moving: 'zoom',
      });

      const shot3 = manager.addShot(storyboard.id, scene.id, {
        composition: 'medium_shot',
        size: 'middle_shot',
        lens: '50mm',
        moving: 'pan',
      });

      manager.deleteShot(storyboard.id, scene.id, shot2.id);

      expect(scene.shots[0].shotNumber).toBe(1);
      expect(scene.shots[1].shotNumber).toBe(2);
    });
  });

  // 컷 수정 테스트
  describe('updateShot', () => {
    it('should update shot properties including moving type', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1');
      const shot = manager.addShot(storyboard.id, scene.id, {
        composition: 'eye_level',
        size: 'full_shot',
        lens: '35mm',
        moving: 'static',
      });

      manager.updateShot(storyboard.id, scene.id, shot.id, {
        composition: 'close_up',
        lens: '85mm',
        moving: 'dolly',
        description: 'Close-up with dolly movement',
      });

      expect(shot.composition).toBe('close_up');
      expect(shot.lens).toBe('85mm');
      expect(shot.moving).toBe('dolly');
      expect(shot.description).toBe('Close-up with dolly movement');
    });

    it('should not change unspecified properties', () => {
      const storyboard = manager.createStoryboard('Test SB');
      const scene = manager.addScene(storyboard.id, 'Scene 1');
      const shot = manager.addShot(storyboard.id, scene.id, {
        composition: 'eye_level',
        size: 'full_shot',
        lens: '35mm',
        moving: 'static',
      });

      manager.updateShot(storyboard.id, scene.id, shot.id, {
        composition: 'close_up',
      });

      expect(shot.size).toBe('full_shot');
      expect(shot.lens).toBe('35mm');
      expect(shot.moving).toBe('static');
    });
  });
});
