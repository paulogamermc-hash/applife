export interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  gold: number;
  title: string; // e.g., "Warrior", "Mage"
}

export interface Attribute {
  id: string;
  name: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  icon: string;
  color: 'physical' | 'mind' | 'career' | 'social';
}

export type TaskCategory = 'daily' | 'habit' | 'task' | 'project';

export interface Task {
  id: string;
  description: string;
  category: TaskCategory;
  attributeId: string;
  xpValue: number;
  goldValue: number;
  isCompleted: boolean;
  isRecurring?: boolean;
  recurrenceRule?: string;
  createdAt: Date;
  subtasks?: Task[];
}

export interface Reward {
  id: string;
  description: string;
  cost: number;
  icon: string;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export interface UserStats {
  missionsCompleted: number;
  streakDays: number;
  highestAttribute: {
    name: string;
    level: number;
  };
}
