import Image from 'next/image';

interface BookCoverImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function BookCoverImage({
  src,
  alt,
  width = 80,
  height = 120,
  className = '',
}: BookCoverImageProps) {
  return (
    <Image
      src={src || '/images/default-book.png'}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-lg object-cover ${className}`}
      unoptimized={!src?.startsWith('http')}
    />
  );
}
