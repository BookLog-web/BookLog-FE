'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '../api-client';

interface User {
  id: string;
  email: string;
  nickname: string | null;
  avatar: string | null;
  provider: string;
  createdAt: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token =
          typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await apiClient.get<User>('/auth/me');
        setUser(userData);
      } catch (err: any) {
        // 401 에러는 정상적인 상황 (로그인 안됨)이므로 조용히 처리
        if (err?.statusCode !== 401) {
          console.error('Failed to fetch user:', err);
        }
        setError('Failed to fetch user');
        // 토큰은 401인 경우에만 제거 (서버 내부 에러 5xx 등에서는 유지)
        if (typeof window !== 'undefined' && err?.statusCode === 401) {
          localStorage.removeItem('accessToken');
        }
        // 사용자 상태는 에러 시 명확히 초기화
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    setUser(null);
  };

  return {
    user,
    userId: user?.id,
    loading,
    error,
    logout,
    isAuthenticated: !!user,
  };
}
