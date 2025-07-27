import { users, learningProgress, audioCache, type User, type InsertUser, type LearningProgress, type InsertProgress, type AudioCache, type InsertAudioCache } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserProgress(userId: number): Promise<LearningProgress[]>;
  updateProgress(progress: InsertProgress): Promise<LearningProgress>;
  
  getCachedAudio(textContent: string): Promise<AudioCache | undefined>;
  cacheAudio(audio: InsertAudioCache): Promise<AudioCache>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progress: Map<number, LearningProgress>;
  private audioCache: Map<string, AudioCache>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentAudioId: number;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
    this.audioCache = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentAudioId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProgress(userId: number): Promise<LearningProgress[]> {
    return Array.from(this.progress.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async updateProgress(progressData: InsertProgress): Promise<LearningProgress> {
    const id = this.currentProgressId++;
    const progress: LearningProgress = {
      ...progressData,
      id,
      completedAt: progressData.completed ? new Date() : null,
    };
    this.progress.set(id, progress);
    return progress;
  }

  async getCachedAudio(textContent: string): Promise<AudioCache | undefined> {
    return this.audioCache.get(textContent);
  }

  async cacheAudio(audioData: InsertAudioCache): Promise<AudioCache> {
    const id = this.currentAudioId++;
    const audio: AudioCache = {
      ...audioData,
      id,
      createdAt: new Date(),
    };
    this.audioCache.set(audioData.textContent, audio);
    return audio;
  }
}

export const storage = new MemStorage();
