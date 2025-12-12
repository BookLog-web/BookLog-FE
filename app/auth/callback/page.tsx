'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', token);

      // 사용자 정보를 가져오기 위해 API 호출 (옵션)
      // fetch('http://localhost:3000/api/auth/me', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((user) => {
      //     localStorage.setItem('user', JSON.stringify(user));
      //   });

      // 메인 페이지로 리다이렉트
      router.push('/');
    } else {
      // 토큰이 없으면 로그인 실패
      console.error('로그인 실패: 토큰을 받지 못했습니다.');
      router.push('/');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
