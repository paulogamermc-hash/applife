import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { FAB } from '../components/FAB';

export function Shop() {
  const { user, rewards, purchaseReward } = useGame();
  const [showAddReward, setShowAddReward] = useState(false);
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState<string | null>(null);

  const handlePurchase = (rewardId: string) => {
    const success = purchaseReward(rewardId);
    if (success) {
      setShowPurchaseConfirm(null);
      // Could show a success toast here
    }
  };

  const selectedReward = rewards.find(r => r.id === showPurchaseConfirm);

  return (
    <div className="pb-20 px-4 pt-6 mobile-container">
      {/* Header with Gold Balance */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Rewards Shop</h1>
        <div className="flex items-center gap-2 text-accent-gold font-bold text-lg">
          <span className="text-2xl">●</span>
          <span>{user.gold} Gold</span>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {rewards.map((reward) => {
          const canAfford = user.gold >= reward.cost;

          return (
            <div
              key={reward.id}
              className={`bg-light-surface dark:bg-dark-surface rounded-xl p-4 shadow-card dark:shadow-card-dark transition-all ${
                canAfford ? 'hover:scale-105 cursor-pointer' : 'opacity-60'
              }`}
              onClick={() => canAfford && setShowPurchaseConfirm(reward.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-3">{reward.icon}</div>
                <h3 className="font-semibold text-sm mb-2 min-h-[2.5rem]">
                  {reward.description}
                </h3>
                <div className="bg-accent-gold text-dark-bg px-3 py-1 rounded-full font-bold text-sm">
                  {reward.cost} Gold
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <FAB onClick={() => setShowAddReward(true)} />

      {/* Add Reward Modal */}
      {showAddReward && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAddReward(false)}
        >
          <div
            className="bg-white dark:bg-dark-surface rounded-xl p-6 m-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New Reward</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Reward creation form would go here...
            </p>
            <button
              onClick={() => setShowAddReward(false)}
              className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Purchase Confirmation Modal */}
      {showPurchaseConfirm && selectedReward && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPurchaseConfirm(null)}
        >
          <div
            className="bg-white dark:bg-dark-surface rounded-xl p-6 m-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-7xl mb-4">{selectedReward.icon}</div>
              <h2 className="text-xl font-bold mb-2">{selectedReward.description}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Spend {selectedReward.cost} gold to claim this reward?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPurchaseConfirm(null)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePurchase(selectedReward.id)}
                  className="flex-1 bg-accent-blue text-white py-2 rounded-lg font-semibold"
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
