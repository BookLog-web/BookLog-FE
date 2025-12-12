# Frontend Setup Guide

## ✅ 완료된 설정

### 1. 환경 변수

- `.env.local` 파일이 생성되었습니다
- API URL과 테스트 사용자 ID가 설정되었습니다

### 2. API 클라이언트

- `src/lib/api-client.ts` - HTTP 클라이언트
- `src/lib/api/` - 각 리소스별 API 함수들

### 3. TypeScript 타입

- `src/types/index.ts` - 모든 타입 정의

### 4. 테스트 데이터

백엔드에 다음 데이터가 생성되었습니다:

- ✅ 테스트 사용자 (Alex)
- ✅ 3권의 책
- ✅ 1개의 읽기 기록 (The Midnight Library - 진행 중)
- ✅ 1개의 독서 목표

---

## 🚀 사용 방법

### API 호출 예제

```typescript
import {
  booksApi,
  readingLogsApi,
  readingGoalsApi,
  achievementsApi,
  statisticsApi,
} from '@/src/lib/api';

// 현재 읽고 있는 책 조회
async function getCurrentReading() {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentBooks = await readingLogsApi.getCurrent(userId);
  return currentBooks;
}

// 현재 독서 목표 조회
async function getCurrentGoal() {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const goal = await readingGoalsApi.getCurrent(userId);
  return goal;
}

// 책 검색
async function searchBooks(query: string) {
  const result = await booksApi.getAll({ search: query, page: 1, limit: 20 });
  return result.data;
}

// 진행도 업데이트
async function updateProgress(logId: string, page: number) {
  await readingLogsApi.updateProgress(logId, {
    currentPage: page,
    totalPages: 389,
  });
}

// 독서 완료
async function finishBook(logId: string, rating: number, review: string) {
  await readingLogsApi.finish(logId, {
    rating,
    review,
    finishedAt: new Date().toISOString(),
  });
}

// 통계 조회
async function getStats() {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const stats = await statisticsApi.getSummary(userId);
  return stats;
}
```

### React 컴포넌트에서 사용

```typescript
'use client';

import { useEffect, useState } from 'react';
import { readingLogsApi } from '@/src/lib/api';
import type { ReadingLog } from '@/src/types';

export function CurrentReading() {
  const [books, setBooks] = useState<ReadingLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
        const data = await readingLogsApi.getCurrent(userId);
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {books.map((log) => (
        <div key={log.id}>
          <h3>{log.book?.title}</h3>
          <p>Progress: {log.currentPage}/{log.totalPages}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 📁 프로젝트 구조

```
booklog-web/
├── .env.local                 # 환경 변수
├── src/
│   ├── lib/
│   │   ├── api-client.ts     # HTTP 클라이언트
│   │   └── api/              # API 함수들
│   │       ├── books.ts
│   │       ├── reading-logs.ts
│   │       ├── reading-goals.ts
│   │       ├── achievements.ts
│   │       ├── statistics.ts
│   │       └── index.ts
│   ├── types/
│   │   └── index.ts          # TypeScript 타입
│   ├── views/
│   │   └── ui/               # 페이지 컴포넌트
│   └── widgets/
│       └── ui/               # 재사용 가능한 컴포넌트
└── app/                      # Next.js 라우트
```

---

## 🔧 다음 단계

1. **서버 실행**

   ```bash
   # Terminal 1 - Backend
   cd booklog-api
   npm run start:dev

   # Terminal 2 - Frontend
   cd booklog-web
   npm run dev
   ```

2. **배지 시드 (선택사항)**

   ```bash
   curl -X POST http://localhost:3000/api/achievements/seed
   ```

3. **페이지 연결**
   - Home 페이지에 현재 읽는 책, 목표 등 연결
   - Bookshelf 페이지에 완독한 책 목록 연결
   - Goals 페이지에 목표 생성/조회 연결

---

## 🎯 현재 사용 가능한 데이터

- **User ID**: `5632b601-61d9-4ae7-8d87-b61f3f93c7a6`
- **User**: Alex (test@booklog.com)
- **Books**:
  - The Midnight Library (읽는 중: 254/389 pages)
  - Dune
  - Project Hail Mary
- **Goal**: 2024년 목표 - 30권, 10,000페이지

---

## 🐛 문제 해결

### CORS 에러

백엔드 서버가 실행 중인지 확인하세요:

```bash
cd booklog-api
npm run start:dev
```

### 환경 변수가 로드되지 않음

Next.js를 재시작하세요:

```bash
# 개발 서버 중지 (Ctrl+C)
npm run dev  # http://localhost:8000에서 실행됨
```

### API 연결 실패

- 백엔드가 `http://localhost:3000`에서 실행 중인지 확인
- 데이터베이스 연결이 정상인지 확인
- `.env.local` 파일이 있는지 확인
