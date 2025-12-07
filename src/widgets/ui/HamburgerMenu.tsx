'use client';

import { useRouter } from 'next/navigation';

type NavItem = {
  key: string;
  label: string;
  icon: string;
  active?: boolean;
  href: string;
};

const navItems: NavItem[] = [
  { key: 'dashboard', label: '대시보드', icon: '🏠', href: '/' },
  { key: 'bookshelf', label: '내 책장', icon: '📚', href: '/bookshelf' },
  { key: 'goals', label: '목표', icon: '🎯', href: '/goals' },
];

const user = {
  name: 'Alex Morgan',
  email: 'alex.morgan@email.com',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD6zP-8y6eRr6YnAcHwPlaw6GK7O9v7YRIhpscnmBO1M4Uwl2FdTXxnpR6G8q-nF_MNVxefsRJMd8wFPAqbxdoSlcIwvWh3Vd1IH3cWQc8GZ30e5KunZDYX4-s-X0UvqENlzpePLRZ4AU6lyzBc7yF6Se3QQrBr_E14wSmtYPufKZbCOou88YEW2JYENWqzo5O37gf5k0hJOsAKoILCKhcTyM3ywIotL_Ezfb1TWRo2tvzTMhr8g_GLPu_H4g1pfZ09sPLBEfiPHPLF',
};

export default function HamburgerMenu() {
  const router = useRouter();
  return (
    <aside className='border-brown-30/50 bg-brown-20 flex h-screen w-72 flex-col justify-between border-r p-4 text-white'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3 p-2'>
          <div className='bg-brown-40 h-10 w-10 overflow-hidden rounded-full'>
            <div
              className='h-full w-full bg-cover bg-center'
              style={{ backgroundImage: `url(${user.avatar})` }}
              aria-label='사용자 아바타'
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='t-b-b text-white'>{user.name}</h1>
            <p className='t-s-m text-brown-90/80'>{user.email}</p>
          </div>
        </div>

        <nav className='mt-2 flex flex-col gap-2'>
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => router.push(item.href)}
              type='button'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                item.active
                  ? 'bg-brown-40 text-white'
                  : 'text-brown-90 hover:bg-brown-30/60'
              }`}
            >
              <span className='text-lg' aria-hidden>
                {item.icon}
              </span>
              <span className='t-b-m'>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
