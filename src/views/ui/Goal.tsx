'use client';

import { useState } from 'react';
import { HamburgerMenu } from '@/src/widgets';
import { readingGoalsApi } from '@/src/lib/api';
import { useUser } from '@/src/lib/hooks/useUser';
import { useRouter } from 'next/navigation';

const periods = ['올해', '이번 달', '다음 3개월', '직접 입력'];

export default function GoalView() {
  const { userId, user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    period: '올해',
    targetBooks: 5,
    targetPages: 1500,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // Calculate dates based on period
      let startDate = new Date();
      let endDate = new Date();

      switch (formData.period) {
        case '올해':
          startDate = new Date(new Date().getFullYear(), 0, 1);
          endDate = new Date(new Date().getFullYear(), 11, 31);
          break;
        case '이번 달':
          startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
          endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
          break;
        case '다음 3개월':
          startDate = new Date();
          endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        default:
          // 직접 입력의 경우 현재부터 1년
          startDate = new Date();
          endDate = new Date();
          endDate.setFullYear(endDate.getFullYear() + 1);
      }

      console.log('🎯 [GOAL] Creating goal with data:', {
        userId,
        period: formData.period,
        targetBooks: formData.targetBooks,
        targetPages: formData.targetPages,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      });

      const createdGoal = await readingGoalsApi.create({
        userId,
        period: formData.period,
        targetBooks: formData.targetBooks,
        targetPages: formData.targetPages,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      });

      console.log('✅ [GOAL] Goal created successfully:', createdGoal);
      setSuccess(true);
      
      setTimeout(() => {
        console.log('🏠 [GOAL] Navigating to home...');
        router.push('/');
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error('❌ [GOAL] Failed to create goal:', error);
      alert('목표 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white'>
      <HamburgerMenu />

      <main className='flex-1 overflow-y-auto px-6 py-8'>
        <div className='mx-auto flex max-w-3xl flex-col gap-10'>
          <header className='border-brown-30 flex items-center justify-between border-b pb-5'>
            <div className='flex items-center gap-3'>
              <span className='text-brown-50' aria-hidden>
                📚
              </span>
              <h1 className='text-xl font-bold'>북로그</h1>
            </div>
            <div className='flex items-center gap-3'>
              <button
                type='button'
                className='bg-brown-30 flex h-10 w-10 items-center justify-center rounded-lg text-white'
                aria-label='메뉴 열기'
              >
                ☰
              </button>
              <div
                className='h-10 w-10 rounded-full bg-cover bg-center'
                style={{
                  backgroundImage: `url("${user?.avatar}")`,
                }}
                aria-label='사용자 아바타'
              />
            </div>
          </header>

          <div className='flex flex-col items-center gap-4 text-center'>
            <h2 className='t-4xl-eb'>나의 독서 목표 설정</h2>
            <p className='t-b-r text-brown-90'>
              앞으로의 독서 계획을 정해보세요.
            </p>
          </div>

          {success && (
            <div className='bg-brown-40 rounded-lg p-4 text-center'>
              <p className='text-lg font-bold'>✅ 목표가 생성되었습니다!</p>
              <p className='text-brown-90 mt-2'>홈으로 이동합니다...</p>
            </div>
          )}

          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className='flex w-full gap-4 '>
              <div className='flex flex-col gap-2 w-full '>
                <label className='t-b-sb text-brown-90' htmlFor='goal-period'>
                  목표 기간
                </label>
                <div className='relative'>
                  <select
                    id='goal-period'
                    className='border-brown-30 bg-brown-20 focus:border-brown-50 h-12 w-full rounded-lg border px-4 pr-10 text-white focus:outline-none'
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({ ...formData, period: e.target.value })
                    }
                  >
                    {periods.map((period) => (
                      <option key={period} value={period} className='bg-brown-20'>
                        {period}
                      </option>
                    ))}
                  </select>
                  
                </div>
              </div>

              <div className='flex flex-col gap-2 w-full flex-1'>
                <label className='t-b-sb text-brown-90' htmlFor='books'>
                  책 권수
                </label>
                <input
                  id='books'
                  type='number'
                  min={1}
                  value={Number.isNaN(formData.targetBooks) ? '' : formData.targetBooks}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    setFormData({
                      ...formData,
                      targetBooks: Number.isNaN(next) ? 0 : next,
                    });
                  }}
                  className='border-brown-30 bg-brown-20 focus:border-brown-50 h-12 rounded-lg border px-4 text-white focus:outline-none'
                  required
                />
              </div>

              
            </div>

            <div className='pt-2'>
              <button
                type='submit'
                disabled={loading || success}
                className='btn bg-brown-40 hover:bg-brown-30 w-full px-6 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? '생성 중...' : success ? '완료!' : '목표 저장'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

