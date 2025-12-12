'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/src/lib/hooks/useUser';

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
  { key: 'community', label: '커뮤니티', icon: '💬', href: '/community' },
];

export default function HamburgerMenu() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="border-brown-30/50 bg-brown-20 flex h-screen w-72 flex-col justify-between border-r p-4 text-white">
      <div className="flex flex-col gap-4">
        {/* 로그인 상태에 따른 헤더 */}
        {loading ? (
          <div className="flex items-center gap-3 p-2">
            <div className="bg-brown-40 h-10 w-10 animate-pulse rounded-full" />
            <div className="flex flex-col gap-1">
              <div className="bg-brown-40 h-4 w-24 animate-pulse rounded" />
              <div className="bg-brown-40 h-3 w-32 animate-pulse rounded" />
            </div>
          </div>
        ) : isAuthenticated && user ? (
          // 로그인 상태: 사용자 정보 표시
          <div className="flex items-center gap-3 p-2">
            <div className="bg-brown-40 h-10 w-10 overflow-hidden rounded-full">
              {user.avatar ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${user.avatar})` }}
                  aria-label="사용자 아바타"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl">
                  👤
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="t-b-b text-white">
                {user.nickname || '사용자'}
              </h1>
              <p className="t-s-m text-brown-90/80">{user.email}</p>
            </div>
          </div>
        ) : (
          // 미 로그인 상태: 로그인 버튼
          <div className="flex flex-col gap-2 p-2">
            <button
              onClick={() => router.push('/login')}
              className="bg-brown-40 hover:bg-brown-50 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-white transition-colors"
            >
              <span className="text-lg">🔐</span>
              <span className="t-b-m">로그인</span>
            </button>
            <p className="t-s-s text-brown-90/70 text-center">
              독서 기록을 시작하세요
            </p>
          </div>
        )}

        <nav className="mt-2 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => router.push(item.href)}
              type="button"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                item.active
                  ? 'bg-brown-40 text-white'
                  : 'text-brown-90 hover:bg-brown-30/60'
              }`}
            >
              <span className="text-lg" aria-hidden>
                {item.icon}
              </span>
              <span className="t-b-m">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 로그아웃 버튼 (로그인 상태일 때만 표시) */}
      {isAuthenticated && (
        <div className="border-brown-30/50 border-t pt-4">
          <button
            onClick={handleLogout}
            className="text-brown-90 hover:bg-brown-30/60 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
          >
            <span className="text-lg" aria-hidden>
              🚪
            </span>
            <span className="t-b-m">로그아웃</span>
          </button>
        </div>
      )}
    </aside>
  );
}
