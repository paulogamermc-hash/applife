import { useGame } from '../contexts/GameContext';
import { useTheme } from '../contexts/ThemeContext';
import { ProgressBar } from '../components/ProgressBar';

export function Profile() {
  const { user, attributes, stats, achievements } = useGame();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="pb-20 px-4 pt-6 mobile-container">
      {/* Header with Settings */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-light-surface dark:bg-dark-surface rounded-full shadow-card dark:shadow-card-dark"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Hero Card */}
      <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 shadow-card dark:shadow-card-dark mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-5xl mb-3">
            {user.avatar}
          </div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-accent-blue font-semibold">{user.title} Lvl.{user.level}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Missions<br/>Completed:</p>
            <p className="text-2xl font-bold">{stats.missionsCompleted}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Streak Days</p>
            <p className="text-2xl font-bold">{stats.streakDays}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Highest Level:</p>
            <p className="text-2xl font-bold">{stats.highestAttribute.name} (Lvl. {stats.highestAttribute.level})</p>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Attributes</h3>
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-4 shadow-card dark:shadow-card-dark space-y-4">
          {attributes.map((attr) => (
            <div key={attr.id} className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-2xl">{attr.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{attr.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Lvl. {attr.level}</span>
                  </div>
                  <ProgressBar current={attr.currentXp} max={attr.xpToNextLevel} color={attr.color} height="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-bold mb-3">Achievements</h3>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`aspect-square rounded-xl flex items-center justify-center text-4xl shadow-card dark:shadow-card-dark ${
                achievement.isUnlocked
                  ? 'bg-gradient-to-br from-accent-gold to-accent-orange'
                  : 'bg-gray-300 dark:bg-gray-700 opacity-50'
              }`}
              title={achievement.name}
            >
              {achievement.isUnlocked ? achievement.icon : '🔒'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
