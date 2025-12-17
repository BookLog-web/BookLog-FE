'use client';

type LoadingProps = {
  message?: string;
  fullPage?: boolean;
  className?: string;
};

export default function Loading({ message = '로딩 중...', fullPage = true, className = '' }: LoadingProps) {
  const containerClass = fullPage
    ? 'flex items-center justify-center min-h-screen bg-brown-20'
    : 'flex items-center justify-center py-12';

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-50 mx-auto mb-4"></div>
        <p className="text-brown-90">{message}</p>
      </div>
    </div>
  );
}

