export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  content: any;
}

export interface LearningProgress {
  id: number;
  userId?: number;
  moduleId: number;
  lessonId: number;
  completed: boolean;
  score: number;
  timeSpent: number;
  completedAt?: Date;
}

export interface AudioState {
  isPlaying: boolean;
  currentAudio: string | null;
  audioUrl: string | null;
}

export interface RobotGesture {
  type: 'wave' | 'point' | 'nod' | 'idle';
  duration: number;
}
