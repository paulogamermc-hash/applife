import { useGame } from '../contexts/GameContext';
import { ProgressBar } from '../components/ProgressBar';
import { FAB } from '../components/FAB';
import { useState } from 'react';

export function Dashboard() {
  const { user, attributes, tasks, completeTask } = useGame();
  const [showAddMission, setShowAddMission] = useState(false);

  const dailyTasks = tasks.filter(t => t.category === 'daily' && !t.isCompleted).slice(0, 3);

  return (
    <div className="pb-20 px-4 pt-4 mobile-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="text-2xl">☰</button>
          <h1 className="text-xl font-semibold">Personal Journey</h1>
        </div>
      </div>

      {/* Character Card */}
      <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-4 mb-4 shadow-card dark:shadow-card-dark">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl">
            {user.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">{user.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lvl. {user.level}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-accent-gold font-bold">
              <span className="text-xl">●</span>
              <span>{user.gold}</span>
            </div>
          </div>
        </div>
        <ProgressBar current={user.currentXp} max={user.xpToNextLevel} color="blue" height="lg" />
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          {user.currentXp}/{user.xpToNextLevel} XP
        </p>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {attributes.map((attr) => (
          <div
            key={attr.id}
            className="bg-light-surface dark:bg-dark-surface rounded-xl p-4 shadow-card dark:shadow-card-dark"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{attr.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{attr.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Lvl. {attr.level}</p>
              </div>
            </div>
            <ProgressBar current={attr.currentXp} max={attr.xpToNextLevel} color={attr.color} height="sm" />
          </div>
        ))}
      </div>

      {/* Day's Missions */}
      <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-4 shadow-card dark:shadow-card-dark">
        <h3 className="font-bold text-lg mb-4">Day's Missions</h3>
        <div className="space-y-3">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
              onClick={() => completeTask(task.id)}
            >
              <div className="w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500 flex-shrink-0" />
              <span className="flex-1">{task.description}</span>
              <span className="text-accent-green font-semibold text-sm">+{task.xpValue} XP</span>
            </div>
          ))}
        </div>
      </div>

      <FAB onClick={() => setShowAddMission(true)} />

      {/* Simple Modal for Add Mission */}
      {showAddMission && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAddMission(false)}
        >
          <div
            className="bg-white dark:bg-dark-surface rounded-xl p-6 m-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Mission creation form would go here...
            </p>
            <button
              onClick={() => setShowAddMission(false)}
              className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
