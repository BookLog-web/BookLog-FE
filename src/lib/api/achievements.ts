import { apiClient } from '../api-client';
import type { Achievement, UnlockedAchievement } from '@/src/types';

export const achievementsApi = {
  // Get all achievements
  getAll: () => {
    return apiClient.get<Achievement[]>('/achievements');
  },

  // Get achievement by ID
  getById: (id: string) => {
    return apiClient.get<Achievement>(`/achievements/${id}`);
  },

  // Get unlocked achievements
  getUnlocked: (userId: string) => {
    return apiClient.get<UnlockedAchievement[]>(
      `/achievements/unlocked/${userId}`,
    );
  },

  // Get recent achievements
  getRecent: (userId: string, limit?: number) => {
    return apiClient.get<UnlockedAchievement[]>(
      `/achievements/recent/${userId}`,
      { limit },
    );
  },

  // Seed achievements
  seed: () => {
    return apiClient.post<{
      message: string;
      achievements: Achievement[];
    }>('/achievements/seed');
  },

  // Unlock achievement
  unlock: (userId: string, achievementId: string) => {
    return apiClient.post('/achievements/unlock', { userId, achievementId });
  },
};
