interface CircularProgressProps {
  current: number;
  total: number;
  size?: number;
  label?: string;
}

export default function CircularProgress({
  current,
  total,
  size = 132,
  label = '권',
}: CircularProgressProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className='flex justify-center'>
      <div className='relative' style={{ width: size, height: size }}>
        <svg className='h-full w-full' viewBox='0 0 36 36' role='img'>
          <circle
            className='stroke-brown-50/50'
            cx='18'
            cy='18'
            r='16'
            fill='none'
            strokeWidth='3'
          />
          <circle
            className='stroke-brown-50'
            cx='18'
            cy='18'
            r='16'
            fill='none'
            strokeWidth='3'
            strokeDasharray='100'
            strokeDashoffset={100 - percentage}
            transform='rotate(-90 18 18)'
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-3xl font-bold text-white'>
            {current}
            <span className='text-xl'>/{total}</span>
          </span>
          <span className='t-b-r text-brown-90'>{label}</span>
        </div>
      </div>
    </div>
  );
}
