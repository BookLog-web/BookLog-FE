interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function ProgressBar({
  current,
  total,
  showLabel = true,
  height = 'md',
  color = 'bg-brown-50',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  const heightClasses = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };

  return (
    <div className='space-y-1'>
      {showLabel && (
        <div className='flex items-center justify-between text-xs'>
          <span className='text-brown-90'>
            {current} / {total}
          </span>
          <span className='text-brown-50 font-semibold'>{percentage}%</span>
        </div>
      )}
      <div className={`bg-brown-40/40 w-full rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${color} h-full rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
