// Book Types
export interface Book {
  id: string;
  isbn?: string;
  title: string;
  author?: string;
  publisher?: string;
  published_at?: string;
  cover_url?: string;
  created_at: string;
}

export interface CreateBookDto {
  isbn?: string;
  title: string;
  author?: string;
  publisher?: string;
  published_at?: string;
  cover_url?: string;
}

// Naver Book Search Types
export interface NaverBook {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  description: string;
  cover_url: string;
  published_at: string;
  link: string;
}

export interface NaverBookSearchResponse {
  total: number;
  start: number;
  display: number;
  items: NaverBook[];
}

// Reading Log Types
export type ReadingStatus = 'READING' | 'COMPLETED' | 'TO_READ' | 'STOPPED';

export interface ReadingLog {
  id: string;
  userId: string;
  bookId: string;
  status: ReadingStatus;
  startedAt?: string;
  finishedAt?: string;
  currentPage?: number;
  totalPages?: number;
  totalMinutes?: number;
  lastLocation?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
  book?: Book;
  user?: User;
}

export interface CreateReadingLogDto {
  userId: string;
  bookId: string;
  status?: ReadingStatus;
  startedAt?: string;
  currentPage?: number;
  totalPages?: number;
}

export interface UpdateProgressDto {
  currentPage: number;
  totalPages?: number;
  lastLocation?: string;
  totalMinutes?: number;
}

export interface FinishReadingDto {
  finishedAt?: string;
  rating?: number;
  review?: string;
}

// Reading Goal Types
export interface ReadingGoal {
  id: string;
  userId: string;
  period: string;
  targetBooks: number;
  targetPages?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingGoalWithProgress extends ReadingGoal {
  progress: {
    completedBooks: number;
    targetBooks: number;
    booksPercentage: number;
    totalPagesRead: number;
    targetPages: number;
    pagesPercentage: number;
  };
}

export interface CreateReadingGoalDto {
  userId: string;
  period: string;
  targetBooks: number;
  targetPages?: number;
  startDate: string;
  endDate: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  key: string;
  name: string;
  description?: string;
  icon: string;
  createdAt: string;
}

export interface UnlockedAchievement extends Achievement {
  unlockedAt: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  nickname?: string;
  avatar?: string;
  createdAt: string;
}

// Statistics Types
export interface ReadingStatistics {
  totalBooks: number;
  completedBooks: number;
  currentlyReading: number;
  toRead: number;
  totalPages: number;
  totalMinutes: number;
  totalHours: number;
  averageRating: number | null;
}

export interface YearlyStatistics {
  year: number;
  completedBooks: number;
  totalPages: number;
  totalMinutes: number;
  totalHours: number;
  monthlyData: MonthlyData[];
}

export interface MonthlyData {
  month: number;
  books: number;
  pages: number;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
