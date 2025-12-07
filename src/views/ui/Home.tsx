import { HamburgerMenu } from '@/src/widgets';

const upNext = [
  {
    title: 'Dune',
    author: 'Frank Herbert',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzaXSYKzNWGabEFiszsPFP58hIhL3d_rGp7lqwbwzmieFY_yk67iLKV2I6NfMdIpugGINFJj0g_h-2q-or7AjiAm9xr2HjcPW6_fpiQoDefuC_9iJnARi5IeKX-Q5zjXx-It9DOHyUyJa5gywwppE_SpzwPBO9KJ8pCDtEie7kFGCM6Hlru1KQvMQ5NxszNxpLa7P8SaW9MYdS1SwudmAOFtwPIelAmvK8pIGWm-GFXpyNsjUWLsRayINbMYtIM4VuFVs81gCHFa8',
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFropDn5QaeANxQ4F2TNtS-19c86XoxiZxVreZliAsoRJN5KaEWW3T_oXnp_LOJOPxx357cep8Bn-WIzJJLG3xxPCd0v4xJ1nvrXqfPINDoEoXxQKg2Gz-ps6l-axaDmC0RxAfOMW3d-AIRdUXnYvIAaULYdjtzKKVljpqM1ZghPa_WEGVfs2E7qYnJLa0Q8PEBbuIhGHr3DEhL8zGsSVh6r5RlMqdaUjR9jeauI2FP25FufdpnhA746TYiPHWT6YGtJALoQ7rPwkk',
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDS5cBCBtqrIeerEZT10f55oSdwFBdX0qLXrI_yCQASv9QJC6amTSbTwtizz1A7_wjHbcKY41VeaJSoQMtxdpiuHBkjDyUptCA26gX_AKQMr0ziRws3Ng9jcFrw1NWVaosctE1gIEKHywDJSg5Qpg3UZirE7OTrUGda6HeHMkyjLifrRP3mm8qo97ntDVc8rzULNYJYkQXnse1JDeUAwfYZYabKwaw0m8PKCZUHJJimIXKWSN7f37WkS9nxSGdGgoILw22DJkXMQnJK',
  },
  {
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAH-vxz7NHAmm7jmT_-wG-Zb3w04eBD-dq7S6YV5iluzek6HSAEfjEtY3CvrVokXaXxlyxMp-Gw8jdKXOdsxv0cF0eELnRulUcJOr7zKnbkKyuZ9m0FFW1DzjeX9FNujk36lKe40aCAdQkNtSCRGcvbCJUXmNM_CzYDtf1QnRd2NiBGiRKeL0erq6Cikp0r16voCWkT8JrgtPSWNurq0A4qfYch3vdVk9c2NCMjjfCs4Glo4ffRTXbwQ1ldNJjQNYxgxH0vbZfdWyEL',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVBOeZvOk3DlcY7EF1cFbc8Gzla2u0KST1N0462p2G0UpAXx5Z6ofr3pSAHCsez_U-CFtW-18xjx2eXiPBYvcq_5nu162TvecqcqNonC_IZ_DVOXC22EV_lG5mSkwTgCEtfbmoIpCuKKK3qPztUA51300ZltEj7uSACtaSX5-vIIXKlUHPZrxPsZ4vb3AB6RcO-nSdoIlZlKiQJOTIGN4GltHdQKTWBof2Oz44tdu5-sVp7n6yAtFH9O2Ly6uutrstqmpY-fFjNX8O',
  },
];

const achievements = [
  { key: 'streak', label: '연속 독서', icon: 'local_fire_department' },
  { key: 'ten-books', label: '10권 완독', icon: 'bookmark_added' },
  { key: 'page-turner', label: '페이지 러버', icon: 'import_contacts' },
  { key: 'night-owl', label: '야간 독서', icon: 'nights_stay', muted: true },
];

export default function HomeView() {
  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white'>
      <HamburgerMenu />

      <main className='flex-1 overflow-y-auto px-6 py-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <header className='border-brown-30 flex items-center justify-between border-b pb-4'>
            <div className='flex items-center gap-3'>
              <span className='text-brown-50' aria-hidden>
                📚
              </span>
              <h2 className='text-lg leading-tight font-bold'>북로그</h2>
            </div>
            <div className='flex flex-1 items-center justify-end gap-3 sm:gap-6'>
              <label className='hidden h-10 max-w-64 flex-1 flex-col sm:flex'>
                <div className='bg-brown-30 flex h-full w-full items-stretch rounded-lg'>
                  <div className='text-brown-90 flex items-center justify-center px-3'>
                    🔍
                  </div>
                  <input
                    className='t-b-r placeholder:text-brown-90/80 flex-1 rounded-r-lg bg-transparent px-3 text-white focus:ring-0 focus:outline-none'
                    placeholder='도서를 검색하세요'
                  />
                </div>
              </label>
              <button
                type='button'
                className='bg-brown-30 flex h-10 w-10 items-center justify-center rounded-lg text-white sm:hidden'
                aria-label='검색 열기'
              >
                🔍
              </button>
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
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCql8H1vV-o22Xcq1NKm3m7N2EAON8fIVEVn7OFzY_kz_Kg-eUlrGm-bCdwA6vz8ag0YSxEc6rMcLBFvqKpiIjeu3SJHx13lNr7RLlX5ee16-JQVAfJ881z4M_aK9_LWP9FFwTN_eDbTp7-K3KiL8MXoaLdIsW1an0rheWEd_Xyf1_GIB05TnmLG_rAsoZYJSlnultOajkqqkCNgqv1ZN4bBDWp4PiuKcrYEtoCoV2H0CWP2eb6c2OgDYCS0tFyOM3uUc0ZrLAzX-d4")',
                }}
                aria-label='사용자 아바타'
              />
            </div>
          </header>

          <section>
            <h1 className='text-3xl leading-tight font-bold'>
              좋은 아침, Alex
            </h1>
          </section>

          <section className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <div className='bg-brown-30 col-span-1 flex flex-col gap-4 rounded-lg p-4 shadow-sm ring-1 ring-white/5 lg:col-span-2'>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <div
                  className='h-48 w-full rounded-lg bg-cover bg-center sm:h-auto sm:w-28'
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7pDg1U8HRHe7yuy24U8uL0JYWWqOPPPy6Mp3FOKK5HQc4kF6qRvNUMC1e5YT8N2ogWeh-9lyhDUS8MyTxsztnDQcqprzqdRtxkbh3Deruuvi5gb0ox8e8YD4d1ENrjHVdAceRFnZyRDFSeFDmzVr2-TDL300TmYH7NuAeQB6VsaURYu2GHiN_2Jhu_2RYMSki4urgTPiwf1hHqahKTIV2dxGae-xoGyjgu0WLOm2YcqMKo7ga48a1FGf7R7Z2GmP-k2KaEVjctfmz")',
                  }}
                  aria-label='Book cover for The Midnight Library'
                />

                <div className='flex flex-1 flex-col gap-3'>
                  <div className='space-y-1'>
                    <p className='t-b-r text-brown-90'>현재 읽는 중</p>
                    <p className='text-xl leading-tight font-bold'>
                      The Midnight Library
                    </p>
                    <p className='t-b-r text-brown-90'>Matt Haig</p>
                  </div>

                  <div className='mt-auto space-y-3'>
                    <div className='flex items-center justify-between text-sm sm:text-base'>
                      <p>254 / 389쪽</p>
                      <p className='text-brown-90'>65%</p>
                    </div>
                    <div className='bg-brown-50/40 h-2 w-full rounded'>
                      <div
                        className='bg-brown-50 h-full rounded'
                        style={{ width: '65%' }}
                        aria-label='읽기 진행률 65%'
                      />
                    </div>
                  </div>

                  <button
                    type='button'
                    className='btn bg-brown-40 hover:bg-brown-30 mt-2 w-fit px-4 py-2 text-white'
                  >
                    진행도 업데이트
                  </button>
                </div>
              </div>
            </div>

            <div className='bg-brown-30 flex flex-col gap-4 rounded-lg p-4 shadow-sm ring-1 ring-white/5'>
              <div className='space-y-1'>
                <h3 className='text-xl leading-tight font-bold'>독서 목표</h3>
                <p className='t-b-r text-brown-90'>2024 도전 과제</p>
              </div>

              <div className='my-4 flex justify-center'>
                <div className='relative h-32 w-32'>
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
                      strokeDashoffset='50'
                      transform='rotate(-90 18 18)'
                    />
                  </svg>
                  <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <span className='text-3xl font-bold text-white'>
                      15<span className='text-xl'>/30</span>
                    </span>
                    <span className='t-b-r text-brown-90'>권</span>
                  </div>
                </div>
              </div>

              <button
                type='button'
                className='btn bg-brown-40 hover:bg-brown-30 w-full px-4 py-2 text-white'
              >
                새 목표 설정
              </button>
            </div>

            <div className='bg-brown-30 flex flex-col gap-4 rounded-lg p-4 shadow-sm ring-1 ring-white/5'>
              <div className='space-y-1'>
                <h3 className='text-xl leading-tight font-bold'>
                  최근 달성 배지
                </h3>
                <p className='t-b-r text-brown-90'>계속해서 읽어봐요!</p>
              </div>

              <div className='my-2 grid grid-cols-3 gap-4 sm:grid-cols-4'>
                {achievements.map(ach => (
                  <div
                    key={ach.key}
                    className={`flex flex-col items-center gap-2 text-center ${
                      ach.muted ? 'opacity-40' : ''
                    }`}
                  >
                    <div className='bg-brown-40 flex size-14 items-center justify-center rounded-full text-white'>
                      <span className='material-symbols-outlined' aria-hidden>
                        {ach.icon}
                      </span>
                    </div>
                    <p className='t-s-m text-brown-90'>{ach.label}</p>
                  </div>
                ))}
              </div>

              <button
                type='button'
                className='btn bg-brown-40 hover:bg-brown-30 w-full px-4 py-2 text-white'
              >
                모든 배지 보기
              </button>
            </div>
          </section>

          <section className='pb-6'>
            <h2 className='pt-2 pb-3 text-[22px] leading-tight font-bold'>
              다음에 읽을 책
            </h2>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {upNext.map(book => (
                <div key={book.title} className='flex flex-col gap-2'>
                  <div
                    className='aspect-2/3 w-full rounded-lg bg-cover bg-center'
                    style={{ backgroundImage: `url(${book.cover})` }}
                    aria-label={`Book cover of ${book.title}`}
                  />
                  <p className='truncate text-sm leading-tight font-semibold text-white'>
                    {book.title}
                  </p>
                  <p className='text-brown-90 truncate text-xs'>
                    {book.author}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
