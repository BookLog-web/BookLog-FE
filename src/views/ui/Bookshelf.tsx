'use client';

import { useEffect, useState } from 'react';
import { HamburgerMenu, Loading } from '@/src/widgets';
import { BookCard } from '@/src/entities';
import { readingLogsApi } from '@/src/lib/api';
import { useUser } from '@/src/lib/hooks/useUser';
import type { ReadingLog, ReadingStatus } from '@/src/types';
import { useRouter } from 'next/navigation';

type StatusFilter = 'ALL' | 'COMPLETED' | 'READING' | 'TO_READ';

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'ALL', label: '전체' },
  { key: 'COMPLETED', label: '읽은 책'},
  { key: 'READING', label: '읽고 있는 책' },
  { key: 'TO_READ', label: '읽고 싶은 책' },
];

export default function BookshelfView() {
  const router = useRouter();
  const { userId, isAuthenticated, loading: userLoading } = useUser();
  const [books, setBooks] = useState<ReadingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  useEffect(() => {
    async function fetchData() {
      if (!userId || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 모든 상태의 책을 가져옴 (TO_READ, READING, COMPLETED, STOPPED)
        const result = await readingLogsApi.getAll({
          userId,
          page: currentPage,
          limit: 20,
        });
        setBooks(result.data);
        setTotalPages(result.meta.totalPages);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!userLoading) {
      fetchData();
    }
  }, [userId, currentPage, isAuthenticated, userLoading]);

  const filteredBooks = books
    .filter((log) => {
      // 상태 필터
      if (statusFilter !== 'ALL' && log.status !== statusFilter) {
        return false;
      }
      // 검색 필터
      if (searchQuery) {
        return (
          log.book?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.book?.author?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    });

  const handleStatusChange = async (logId: string, newStatus: string) => {
    try {
      await readingLogsApi.update(logId, { status: newStatus as ReadingStatus });
      // 낙관적 업데이트
      setBooks(books.map(book => 
        book.id === logId ? { ...book, status: newStatus as ReadingStatus } : book
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  if (loading && currentPage === 1) {
    return <Loading />;
  }

  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white'>
      <HamburgerMenu />

      <main className='flex-1 overflow-y-auto px-6 py-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <h1 className='text-4xl leading-tight font-black tracking-tight'>
              내 책장
            </h1>
            <button 
              className='btn bg-brown-40 hover:bg-brown-30 flex items-center gap-2 rounded-lg px-5 py-3 text-white' 
              onClick={() => router.push('/add')}
            >
              <span aria-hidden>＋</span>
              <span>책 추가</span>
            </button>
          </div>

          {/* 필터 탭 */}
          <div className='flex gap-2 overflow-x-auto pb-2'>
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => {
                  setStatusFilter(filter.key);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 font-medium transition-colors ${
                  statusFilter === filter.key
                    ? 'bg-brown-40 text-white'
                    : 'bg-brown-30/50 text-brown-90 hover:bg-brown-30'
                }`}
              >
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* 검색 */}
          <div>
            <label className='flex flex-col'>
              <div className='bg-brown-30/50 flex w-full items-stretch rounded-lg'>
                <div className='text-brown-90 flex items-center justify-center px-4'>
                  🔍
                </div>
                <input
                  className='t-b-r placeholder:text-brown-90/80 focus:ring-brown-40 flex-1 rounded-r-lg bg-transparent px-4 py-3 text-white focus:ring-2 focus:outline-none'
                  placeholder='내 책장에서 검색하세요'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
          </div>

          {filteredBooks.length > 0 ? (
            <>
              <div className='grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-6'>
                {filteredBooks.map((log) => (
                  <BookCard
                    key={log.id}
                    log={log}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>

              {!searchQuery && totalPages > 1 && (
                <div className='mt-8 flex justify-center'>
                  <nav className='flex items-center gap-2'>
                    <button
                      className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg disabled:opacity-50'
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                      ‹
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            currentPage === page
                              ? 'bg-brown-40 text-white'
                              : 'text-brown-90 hover:bg-brown-30/60'
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className='text-brown-90'>...</span>
                        <button
                          className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg'
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    <button
                      className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg disabled:opacity-50'
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    >
                      ›
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className='bg-brown-30 flex flex-col items-center gap-4 rounded-lg p-12'>
              <span className='text-6xl'>📚</span>
              <h3 className='text-xl font-bold'>
                {searchQuery ? '검색 결과가 없습니다' : '책장이 비어있습니다'}
              </h3>
              <p className='text-brown-90'>
                {searchQuery
                  ? '다른 검색어로 시도해보세요'
                  : '첫 번째 책을 추가해보세요!'}
              </p>
              {!searchQuery && (
                <button 
                  className='btn bg-brown-40 hover:bg-brown-30 mt-4 px-6 py-3 text-white'
                  onClick={() => router.push('/add')}
                >
                  책 추가하기
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
