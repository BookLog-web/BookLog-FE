'use client';

import { HamburgerMenu } from '@/src/widgets';

export default function CommunityView() {
  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white'>
      <HamburgerMenu />

      <main className='flex-1 flex items-center justify-center px-6 py-12'>
        <div className='bg-brown-30 flex max-w-xl flex-col items-center gap-4 rounded-xl p-8 text-center shadow-sm ring-1 ring-white/5'>
          <span className='text-5xl' aria-hidden>
            🛠️
          </span>
          <h1 className='text-2xl font-bold'>커뮤니티 기능을 준비 중이에요</h1>
          <p className='text-brown-90 text-base leading-relaxed'>
            곧 독서 기록을 공유하고 추천을 나눌 수 있는 공간으로 찾아올게요.
          </p>
          <button
            type='button'
            className='btn bg-brown-40 hover:bg-brown-30 px-6 py-3 text-white'
            onClick={() => (window.location.href = '/')}
          >
            홈으로 돌아가기
          </button>
        </div>
      </main>
    </div>
  );
}
