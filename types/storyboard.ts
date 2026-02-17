// 렌즈 타입
export type LensType = '24mm' | '35mm' | '50mm' | '85mm' | '105mm' | '200mm';

// 구도 타입 (카메라 각도)
export type CompositionType =
  | 'high_angle'     // 하이앵글 (위에서 내려다보기)
  | 'eye_level'      // 아이레벨 (눈높이)
  | 'low_angle'      // 로우앵글 (아래에서 올려다보기)
  | 'dutch_angle';   // 더치앵글 (기울어진 각도)

// 샷 사이즈 타입 (피사체 크기)
export type ShotSize =
  | 'long_shot'      // LS - 롱샷 (전체 배경 포함)
  | 'full_shot'      // FS - 풀샷 (인물 전신)
  | 'knee_shot'      // KS - 니샷 (무릎 위)
  | 'middle_shot'    // MS - 미들샷 (허리 위)
  | 'bust_shot'      // BS - 바스트샷 (가슴 위)
  | 'head_shoulder'  // HS - 헤드 숄더 (머리&어깨)
  | 'head_close_up'  // HCU - 헤드 클로즈업 (얼굴만)
  | 'object_close_up'; // OCU - 물체 클로즈업

// 무빙 타입 (카메라 움직임)
export type MovingType =
  | 'static'              // 스태틱 (움직임 없음)
  | 'pan'                 // 팬 (좌우 움직임)
  | 'tilt'                // 틸트 (위아래 움직임)
  | 'dolly_in'            // 돌리 인 (전진 움직임)
  | 'dolly_out'           // 돌리 아웃 (후진 움직임)
  | 'crane'               // 크레인 (높낮이 움직임)
  | 'zoom'                // 줌
  | 'tracking'            // 트래킹 (따라감)
  | 'handheld';           // 핸드헬드 (손 흔들림)

// 컷(Shot) 인터페이스
export interface Shot {
  id: string;
  shotNumber: number;
  composition: CompositionType;
  size: ShotSize;
  lens: LensType;
  moving: MovingType;
  description?: string;
  notes?: string;
}

// 씬(Scene) 인터페이스
export interface Scene {
  id: string;
  sceneNumber: number;
  name: string;
  description?: string;
  shots: Shot[];
  createdAt: Date;
  updatedAt: Date;
}

// 스토리보드 인터페이스
export interface Storyboard {
  id: string;
  title: string;
  description?: string;
  scenes: Scene[];
  createdAt: Date;
  updatedAt: Date;
}
