'use client';

import { useState, useEffect } from 'react';
import type { ReadingLog } from '@/src/types';

interface BookCardProps {
  log: ReadingLog;
  onStatusChange: (logId: string, newStatus: string) => void;
}

function Rating({ value }: { value: number }) {
  return (
    <div className='text-brown-50 flex items-center gap-1'>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden>
          {index < value ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    TO_READ: { label: '읽을 예정', color: 'bg-blue-500' },
    READING: { label: '읽는 중', color: 'bg-green-500' },
    COMPLETED: { label: '완독', color: 'bg-purple-500' },
    STOPPED: { label: '중단', color: 'bg-gray-500' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    color: 'bg-gray-500',
  };

  return (
    <span
      className={`${config.color} text-xs px-2.5 py-1 rounded-full text-white font-semibold inline-block pointer-events-none whitespace-nowrap`}
    >
      {config.label}
    </span>
  );
}

export default function BookCard({ log, onStatusChange }: BookCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.status-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleStatusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusSelect = (e: React.MouseEvent, newStatus: string) => {
    e.preventDefault();
    e.stopPropagation();
    onStatusChange(log.id, newStatus);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className='group bg-brown-30 relative aspect-3/4 rounded-2xl'
      style={{ overflow: isDropdownOpen ? 'visible' : 'hidden' }}
    >
      {/* 책 표지 이미지 */}
      <div
        className='absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105'
        style={{ backgroundImage: `url(${log.book?.cover_url})` }}
        aria-label={`${log.book?.title} 표지`}
      />

      {/* 상태 배지 - 클릭 시 상태 변경 메뉴 */}
      <div className='absolute top-2 right-2 z-20 status-dropdown-container'>
        <button
          type='button'
          onClick={handleStatusClick}
          className='relative block'
        >
          <StatusBadge status={log.status} />
        </button>

        {/* 상태 변경 드롭다운 */}
        {isDropdownOpen && (
          <div className='absolute right-0 top-full mt-1 z-50 min-w-36 rounded-lg bg-brown-20 shadow-xl ring-1 ring-white/20 overflow-hidden'>
            {['TO_READ', 'READING', 'COMPLETED', 'STOPPED'].map((status) => (
              <button
                key={status}
                type='button'
                onClick={(e) => handleStatusSelect(e, status)}
                className='block w-full px-3 py-2.5 text-left text-sm hover:bg-brown-30 transition-colors'
              >
                <StatusBadge status={status} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 호버 시 책 정보 */}
      <div className='absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <p className='line-clamp-2 text-base leading-tight font-bold'>
          {log.book?.title}
        </p>
        <p className='text-brown-90 text-sm'>{log.book?.author}</p>
        {log.rating && (
          <div className='mt-2'>
            <Rating value={log.rating} />
          </div>
        )}
      </div>
    </div>
  );
}
