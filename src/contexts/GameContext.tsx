import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Attribute, Task, Reward, Achievement, UserStats } from '../types';

interface GameContextType {
  user: User;
  attributes: Attribute[];
  tasks: Task[];
  rewards: Reward[];
  achievements: Achievement[];
  stats: UserStats;
  completeTask: (taskId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  addReward: (reward: Omit<Reward, 'id' | 'createdAt'>) => void;
  purchaseReward: (rewardId: string) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Initial data
const initialUser: User = {
  id: '1',
  username: 'Warrior',
  avatar: '🧙',
  level: 12,
  currentXp: 850,
  xpToNextLevel: 1200,
  gold: 1250,
  title: 'Warrior'
};

const initialAttributes: Attribute[] = [
  { id: '1', name: 'Physical', level: 8, currentXp: 300, xpToNextLevel: 800, icon: '🏋️', color: 'physical' },
  { id: '2', name: 'Mind', level: 10, currentXp: 600, xpToNextLevel: 1000, icon: '🧠', color: 'mind' },
  { id: '3', name: 'Career', level: 7, currentXp: 400, xpToNextLevel: 700, icon: '💼', color: 'career' },
  { id: '4', name: 'Social', level: 6, currentXp: 200, xpToNextLevel: 600, icon: '👥', color: 'social' },
];

const initialTasks: Task[] = [
  {
    id: '1',
    description: 'Task complete',
    category: 'daily',
    attributeId: '1',
    xpValue: 30,
    goldValue: 10,
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    description: 'Add task',
    category: 'daily',
    attributeId: '2',
    xpValue: 50,
    goldValue: 15,
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    description: 'Compete',
    category: 'daily',
    attributeId: '3',
    xpValue: 20,
    goldValue: 5,
    isCompleted: false,
    createdAt: new Date(),
  },
];

const initialRewards: Reward[] = [
  { id: '1', description: 'Pizza on Saturday', cost: 150, icon: '🍕', createdAt: new Date() },
  { id: '2', description: '2h of Videogame', cost: 300, icon: '🎮', createdAt: new Date() },
  { id: '3', description: 'Weekend Trip', cost: 5000, icon: '✈️', createdAt: new Date() },
  { id: '4', description: 'New Book', cost: 200, icon: '📚', createdAt: new Date() },
];

const initialAchievements: Achievement[] = [
  { id: '1', name: 'First Step', description: 'Complete your first mission', icon: '🏆', isUnlocked: true, unlockedAt: new Date() },
  { id: '2', name: 'Dedicated', description: 'Reach a 7-day streak', icon: '⭐', isUnlocked: true, unlockedAt: new Date() },
  { id: '3', name: 'Scholar', description: 'Reach Mind level 10', icon: '🛡️', isUnlocked: true, unlockedAt: new Date() },
  { id: '4', name: 'Master', description: 'Reach level 50', icon: '🔒', isUnlocked: false },
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : initialUser;
  });

  const [attributes, setAttributes] = useState<Attribute[]>(() => {
    const stored = localStorage.getItem('attributes');
    return stored ? JSON.parse(stored) : initialAttributes;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : initialTasks;
  });

  const [rewards, setRewards] = useState<Reward[]>(() => {
    const stored = localStorage.getItem('rewards');
    return stored ? JSON.parse(stored) : initialRewards;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const stored = localStorage.getItem('achievements');
    return stored ? JSON.parse(stored) : initialAchievements;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const stored = localStorage.getItem('stats');
    return stored ? JSON.parse(stored) : {
      missionsCompleted: 428,
      streakDays: 45,
      highestAttribute: { name: 'Mind', level: 11 }
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('attributes', JSON.stringify(attributes));
  }, [attributes]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.isCompleted) return;

    // Mark task as completed
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, isCompleted: true } : t
    ));

    // Add XP and gold
    const attribute = attributes.find(a => a.id === task.attributeId);
    if (attribute) {
      const newAttributeXp = attribute.currentXp + task.xpValue;
      let newLevel = attribute.level;
      let remainingXp = newAttributeXp;

      // Check for level up on attribute
      if (newAttributeXp >= attribute.xpToNextLevel) {
        newLevel++;
        remainingXp = newAttributeXp - attribute.xpToNextLevel;
      }

      setAttributes(prev => prev.map(a =>
        a.id === task.attributeId
          ? { ...a, level: newLevel, currentXp: remainingXp, xpToNextLevel: a.xpToNextLevel + 100 }
          : a
      ));
    }

    // Add user XP and gold
    const newUserXp = user.currentXp + task.xpValue;
    let newUserLevel = user.level;
    let remainingUserXp = newUserXp;

    if (newUserXp >= user.xpToNextLevel) {
      newUserLevel++;
      remainingUserXp = newUserXp - user.xpToNextLevel;
    }

    setUser(prev => ({
      ...prev,
      level: newUserLevel,
      currentXp: remainingUserXp,
      xpToNextLevel: newUserLevel > prev.level ? prev.xpToNextLevel + 200 : prev.xpToNextLevel,
      gold: prev.gold + task.goldValue
    }));

    // Update stats
    setStats(prev => ({
      ...prev,
      missionsCompleted: prev.missionsCompleted + 1
    }));
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const addReward = (reward: Omit<Reward, 'id' | 'createdAt'>) => {
    const newReward: Reward = {
      ...reward,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setRewards(prev => [...prev, newReward]);
  };

  const purchaseReward = (rewardId: string): boolean => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || user.gold < reward.cost) return false;

    setUser(prev => ({
      ...prev,
      gold: prev.gold - reward.cost
    }));

    return true;
  };

  return (
    <GameContext.Provider value={{
      user,
      attributes,
      tasks,
      rewards,
      achievements,
      stats,
      completeTask,
      addTask,
      addReward,
      purchaseReward
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
