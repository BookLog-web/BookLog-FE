import { apiClient } from '../api-client';
import type {
  ReadingStatistics,
  YearlyStatistics,
  Streak,
} from '@/src/types';

export const statisticsApi = {
  // Get summary statistics
  getSummary: (userId: string) => {
    return apiClient.get<ReadingStatistics>(`/statistics/summary/${userId}`);
  },

  // Get yearly statistics
  getYearly: (userId: string, year?: number) => {
    return apiClient.get<YearlyStatistics>(`/statistics/yearly/${userId}`, {
      year,
    });
  },

  // Get monthly statistics
  getMonthly: (userId: string, year?: number, month?: number) => {
    return apiClient.get<{
      year: number;
      month: number;
      completedBooks: number;
      totalPages: number;
      totalMinutes: number;
      totalHours: number;
    }>(`/statistics/monthly/${userId}`, { year, month });
  },

  // Get reading streak
  getStreak: (userId: string) => {
    return apiClient.get<Streak>(`/statistics/streak/${userId}`);
  },
};
