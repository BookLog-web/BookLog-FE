import { HamburgerMenu } from '@/src/widgets';

const periods = ['올해', '이번 달', '다음 3개월', '직접 입력'];

export default function GoalView() {
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
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCql8H1vV-o22Xcq1NKm3m7N2EAON8fIVEVn7OFzY_kz_Kg-eUlrGm-bCdwA6vz8ag0YSxEc6rMcLBFvqKpiIjeu3SJHx13lNr7RLlX5ee16-JQVAfJ881z4M_aK9_LWP9FFwTN_eDbTp7-K3KiL8MXoaLdIsW1an0rheWEd_Xyf1_GIB05TnmLG_rAsoZYJSlnultOajkqqkCNgqv1ZN4bBDWp4PiuKcrYEtoCoV2H0CWP2eb6c2OgDYCS0tFyOM3uUc0ZrLAzX-d4")',
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

          <form className='flex flex-col gap-6' action='#'>
            <div className='flex flex-col gap-2'>
              <label className='t-b-sb text-brown-90' htmlFor='goal-period'>
                목표 기간
              </label>
              <div className='relative'>
                <select
                  id='goal-period'
                  className='border-brown-30 bg-brown-20 focus:border-brown-50 h-12 w-full rounded-lg border px-4 pr-10 text-white focus:outline-none'
                  defaultValue={periods[0]}
                >
                  {periods.map(period => (
                    <option key={period} value={period} className='bg-brown-20'>
                      {period}
                    </option>
                  ))}
                </select>
                <span className='text-brown-90 pointer-events-none absolute inset-y-0 right-3 flex items-center'>
                  ▾
                </span>
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='flex flex-col gap-2'>
                <label className='t-b-sb text-brown-90' htmlFor='books'>
                  책 권수
                </label>
                <input
                  id='books'
                  type='number'
                  min={0}
                  defaultValue={5}
                  className='border-brown-30 bg-brown-20 focus:border-brown-50 h-12 rounded-lg border px-4 text-white focus:outline-none'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='t-b-sb text-brown-90' htmlFor='pages'>
                  페이지 수
                </label>
                <input
                  id='pages'
                  type='number'
                  min={0}
                  defaultValue={1500}
                  className='border-brown-30 bg-brown-20 focus:border-brown-50 h-12 rounded-lg border px-4 text-white focus:outline-none'
                />
              </div>
            </div>

            <div className='pt-2'>
              <button
                type='submit'
                className='btn bg-brown-40 hover:bg-brown-30 w-full px-6 py-3 text-white'
              >
                목표 저장
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
