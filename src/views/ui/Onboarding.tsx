/* eslint-disable @next/next/no-img-element */

const features = [
  {
    title: '목표 설정',
    description: '목표를 설정하고, 달성하는 성취를 느껴보세요',
    icon: '🎯',
  },
  {
    title: '독서 기록',
    description: '그동안 읽은 책을 모아 나만의 책장을 만들 수 있어요',
    icon: '📚',
  },
  {
    title: '생각 나누기',
    description: '당신의 생각을 나누고, 다른 독자들의 이야기도 만나보아요',
    icon: '🏅',
  },
];

export default function OnboardingView() {
  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white'>
      <header className='mx-auto flex max-w-6xl items-center justify-between px-6 py-8'>
        <div className='flex items-center gap-3'>
          <span className='t-2xl-b font-semibold text-white'>Booklog</span>
        </div>
        <button className='btn bg-brown-60 text-brown-20 px-5 py-2'>
          로그인
        </button>
      </header>

      <main className='mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 lg:flex-row lg:items-center lg:gap-16'>
        <div className='overflow-hidden rounded-3xl bg-black/30 shadow-2xl ring-1 ring-white/5 lg:w-[520px]'>
          <img
            src='https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80'
            alt='햇살이 비치는 창가에서 책을 읽는 사람'
            className='h-full w-full object-cover'
          />
        </div>

        <div className='flex-1 space-y-8'>
          <div className='space-y-3'>
            <p className='text-brown-60 text-sm font-semibold tracking-[0.12em]'>
              BOOKLOG
            </p>
            <h1 className='t-4xl-eb text-white'>
              하루의 작은 페이지를 모아, 당신의 책장을 만들어보세요
            </h1>
            <p className='text-brown-90 max-w-2xl text-lg'>
              읽는 순간을 기록하면, 당신만의 서재가 완성됩니다.
            </p>
          </div>

          <div className='space-y-4'>
            {features.map(feature => (
              <div
                key={feature.title}
                className='bg-brown-30/70 flex items-start gap-4 rounded-2xl px-5 py-4 shadow-lg ring-1 ring-white/5'
              >
                <span className='bg-brown-40 mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg'>
                  {feature.icon}
                </span>
                <div>
                  <h3 className='t-l-b text-white'>{feature.title}</h3>
                  <p className='t-b-r text-brown-90'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col gap-2'>
            <button className='btn bg-brown-40 shadow-soft hover:bg-brown-30 px-6 py-4 text-white'>
              내 독서 기록하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
