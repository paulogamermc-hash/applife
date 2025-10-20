interface ProgressBarProps {
  current: number;
  max: number;
  color?: 'physical' | 'mind' | 'career' | 'social' | 'blue';
  height?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  physical: 'bg-physical',
  mind: 'bg-mind',
  career: 'bg-career',
  social: 'bg-social',
  blue: 'bg-accent-blue',
};

const heightClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function ProgressBar({ current, max, color = 'blue', height = 'md' }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={`w-full ${heightClasses[height]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
      <div
        className={`${colorClasses[color]} ${heightClasses[height]} rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
