'use client';

import { useEffect, useState } from 'react';
import { HamburgerMenu, MainHeader, Loading } from '@/src/widgets';
import { BookCoverImage, ProgressBar, CircularProgress } from '@/src/entities';
import { readingLogsApi, readingGoalsApi, achievementsApi } from '@/src/lib/api';
import { useUser } from '@/src/lib/hooks/useUser';
import type { ReadingLog, ReadingGoalWithProgress, UnlockedAchievement, User } from '@/src/types';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const { userId, user, loading: userLoading, isAuthenticated } = useUser();
  const [currentBooks, setCurrentBooks] = useState<ReadingLog[]>([]);
  const [goal, setGoal] = useState<ReadingGoalWithProgress | null>(null);
  const [achievements, setAchievements] = useState<UnlockedAchievement[]>([]);
  const [upNext, setUpNext] = useState<ReadingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  // Force refresh function
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };
  useEffect(() => {
    async function fetchData() {
      // 로그인하지 않았거나 userId가 없으면 데이터를 가져오지 않음
      if (!userId || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const [currentBooks, currentGoal, recentAchievements, toReadBooks] = await Promise.all([
          readingLogsApi.getCurrent(userId),
          readingGoalsApi.getCurrent(userId),
          achievementsApi.getRecent(userId, 4),
          readingLogsApi.getToRead(userId),
        ]);

        setCurrentBooks((currentBooks || []).slice(0, 3));
        setGoal(currentGoal || null);
        setAchievements(recentAchievements || []);
        setUpNext((toReadBooks || []).slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!userLoading) {
      fetchData();
    }
  }, [userId, isAuthenticated, userLoading, refreshKey]);

  // Refresh data when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && userId && isAuthenticated) {
        refreshData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userId, isAuthenticated]);

  if (userLoading || loading) {
    return <Loading />;
  }

  // 로그인하지 않은 상태
  if (!isAuthenticated || !user) {
    return (
      <div className='bg-brown-20 flex min-h-screen text-white'>
        <HamburgerMenu />
        <main className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center space-y-6'>
            <div className='text-6xl mb-4'>📚</div>
            <h1 className='text-3xl font-bold'>BookLog에 오신 것을 환영합니다</h1>
            <p className='text-brown-90 text-lg'>
              로그인하여 독서 기록을 시작하세요
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className='bg-brown-40 hover:bg-brown-50 px-6 py-3 rounded-lg text-white font-medium transition-colors'
            >
              로그인하기
            </button>
          </div>
        </main>
      </div>
    );

  }

  const completedBooks = goal?.progress?.completedBooks || 0;
  const targetBooks = goal?.targetBooks || 0;
  const currentYear = new Date().getFullYear();

  const formatGoalPeriod = (g: ReadingGoalWithProgress): string => {
    const start = new Date(g.startDate);
    const end = new Date(g.endDate);
    switch (g.period) {
      case '올해':
        return String(new Date().getFullYear());
      case '이번 달': {
        const month = start.getMonth() + 1;
        return `${month}월`;
      }
      case '다음 3개월': {
        const month = end.getMonth() + 1;
        return `${month}월까지`;
      }
      default: {
        const sMonth = start.getMonth() + 1;
        const eMonth = end.getMonth() + 1;
        return `${start.getFullYear()}.${sMonth}~${end.getFullYear()}.${eMonth}`;
      }
    }
  };

  const periodLabel = goal ? formatGoalPeriod(goal) : `${currentYear} 도전 과제`;

  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white'>
      <HamburgerMenu />

      <main className='flex-1 overflow-y-auto px-6 py-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <MainHeader user={user as User} />

          <section>
            <h1 className='text-3xl leading-tight font-bold'>
              좋은 아침, {user?.nickname || 'Reader'}
            </h1>
          </section>

          <section className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            {currentBooks.length > 0 ? (
              <div className='bg-brown-30 col-span-1 rounded-lg p-6 shadow-sm ring-1 ring-white/5'>
                <h2 className='t-xl-b text-white mb-4'>현재 읽는 중</h2>
                <div className='flex flex-col gap-4'>
                  {currentBooks.map((log) => (
                    <div key={log.id} className='flex gap-4 bg-brown-20 rounded-lg p-4'>
                      <BookCoverImage
                        src={log.book?.cover_url}
                        alt={log.book?.title || '책 표지'}
                        width={80}
                        height={120}
                        className='flex-shrink-0'
                      />
                      <div className='flex flex-1 flex-col justify-between min-w-0'>
                        <div className='space-y-1'>
                          <p className='text-base leading-tight font-bold text-white line-clamp-2'>
                            {log.book?.title}
                          </p>
                          <p className='t-s-r text-brown-90 truncate'>
                            {log.book?.author}
                          </p>
                        </div>
                        {log.totalPages && (
                          <div className='mt-2'>
                            <ProgressBar
                              current={log.currentPage || 0}
                              total={log.totalPages}
                              showLabel={true}
                              height='md'
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='bg-brown-30 col-span-1 flex flex-col items-center justify-center gap-4 rounded-lg p-8 shadow-sm ring-1 ring-white/5'>
                <span className='text-5xl'>📖</span>
                <p className='text-brown-90'>현재 읽고 있는 책이 없습니다</p>
                <button className='btn bg-brown-40 hover:bg-brown-30 px-4 py-2 text-white' onClick={() => router.push('/add')}>
                  책 추가하기
                </button>
              </div>
            )}



            <div className='bg-brown-30 flex flex-col gap-8 px-6 justify-between rounded-lg py-6 shadow-sm ring-1 ring-white/5'>
              <div className='space-y-1'>
                <h3 className='text-xl leading-tight font-bold'>독서 목표</h3>
                <p className='t-b-r text-brown-90'>{periodLabel}</p>
              </div>

              {goal ? (
                <>
                  <div className='my-4'>
                    <CircularProgress
                      current={completedBooks}
                      total={targetBooks}
                      size={132}
                      label='권'
                    />
                  </div>

                  <button
                    type='button'
                    onClick={() => router.push('/goals')}
                    className='rounded-xl bg-brown-40 hover:bg-brown-30 w-full px-4 py-4 text-white'
                  >
                    새 목표 설정
                  </button>
                </>
              ) : (
                <div className='flex flex-col items-center gap-4 py-8'>
                  <span className='text-4xl'>🎯</span>
                  <p className='text-brown-90'>설정된 목표가 없습니다</p>
                  <button
                    type='button'
                    onClick={() => router.push('/goals')}
                    className='btn bg-brown-40 hover:bg-brown-30 px-4 py-2 text-white'
                  >
                    목표 설정하기
                  </button>
                </div>
              )}
            </div>

            
          </section>

          <section className='pb-6'>
            <h2 className='pt-2 pb-3 text-[22px] leading-tight font-bold'>
              다음에 읽을 책
            </h2>
            {upNext.length > 0 ? (
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {upNext.map(log => (
                  <div key={log.id} className='flex flex-col gap-2 group cursor-pointer'>
                    <div className='aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105'>
                      <BookCoverImage
                        src={log.book?.cover_url}
                        alt={log.book?.title || '책 표지'}
                        width={200}
                        height={300}
                        className='w-full h-full'
                      />
                    </div>
                    <p className='truncate text-sm leading-tight font-semibold text-white'>
                      {log.book?.title}
                    </p>
                    <p className='text-brown-90 truncate text-xs'>
                      {log.book?.author}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='bg-brown-30 flex flex-col items-center gap-4 rounded-lg p-8'>
                <span className='text-4xl'>📚</span>
                <p className='text-brown-90'>읽을 책 목록이 비어있습니다</p>
                <button 
                  className='btn bg-brown-40 hover:bg-brown-30 px-4 py-2 text-white'
                  onClick={() => router.push('/add')}
                >
                  책 추가하기
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
