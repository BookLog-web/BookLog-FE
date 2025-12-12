import { User } from "@/src/types";

export default function MainHeader({user}: {user: User}) {
  return <header className='border-brown-30 flex items-center justify-between border-b pb-4'>
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
    
  </div>
</header>;
}