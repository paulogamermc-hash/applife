import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { TaskCategory } from '../types';
import { FAB } from '../components/FAB';

const tabs: { id: TaskCategory; label: string }[] = [
  { id: 'daily', label: 'Daily' },
  { id: 'habit', label: 'Habits' },
  { id: 'task', label: 'Tasks' },
  { id: 'project', label: 'Projects' },
];

const xpColors: Record<string, string> = {
  '30': 'bg-accent-green text-white',
  '50': 'bg-accent-purple text-white',
  '20': 'bg-accent-blue text-white',
};

export function Missions() {
  const [activeTab, setActiveTab] = useState<TaskCategory>('daily');
  const [showAddMission, setShowAddMission] = useState(false);
  const { tasks, completeTask } = useGame();

  const filteredTasks = tasks.filter(t => t.category === activeTab);

  return (
    <div className="pb-20 mobile-container">
      {/* Tabs */}
      <div className="sticky top-0 bg-light-bg dark:bg-dark-bg z-10 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-accent-blue text-white'
                  : 'bg-light-surface dark:bg-dark-surface text-gray-600 dark:text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-4 pt-4">
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const bgColor = xpColors[task.xpValue.toString()] || 'bg-accent-blue text-white';

            return (
              <div
                key={task.id}
                className={`bg-light-surface dark:bg-dark-surface rounded-lg p-4 shadow-card dark:shadow-card-dark transition-all ${
                  task.isCompleted ? 'opacity-50' : 'hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex-shrink-0 cursor-pointer transition-all ${
                      task.isCompleted
                        ? 'bg-accent-blue border-accent-blue'
                        : 'border-gray-400 dark:border-gray-500 hover:border-accent-blue'
                    }`}
                    onClick={() => completeTask(task.id)}
                  >
                    {task.isCompleted && (
                      <span className="text-white text-lg leading-6 text-center block">✓</span>
                    )}
                  </div>
                  <span className={`flex-1 ${task.isCompleted ? 'line-through' : ''}`}>
                    {task.description}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${bgColor}`}>
                    +{task.xpValue} XP
                  </span>
                </div>

                {/* Subtasks for projects */}
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="ml-11 mt-3 space-y-2">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-400 dark:border-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {subtask.description}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No {activeTab} missions yet</p>
              <p className="text-sm mt-2">Tap the + button to add one!</p>
            </div>
          )}
        </div>
      </div>

      <FAB onClick={() => setShowAddMission(true)} />

      {/* Simple Modal */}
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
              Mission creation form for {activeTab} category...
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
