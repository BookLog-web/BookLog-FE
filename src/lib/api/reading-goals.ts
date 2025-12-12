import { apiClient } from '../api-client';
import type {
  ReadingGoal,
  ReadingGoalWithProgress,
  CreateReadingGoalDto,
} from '@/src/types';

export const readingGoalsApi = {
  // Get all goals
  getAll: (userId?: string) => {
    return apiClient.get<ReadingGoal[]>('/reading-goals', { userId });
  },

  // Get goal by ID
  getById: (id: string) => {
    return apiClient.get<ReadingGoal>(`/reading-goals/${id}`);
  },

  // Get current active goal
  getCurrent: (userId: string) => {
    return apiClient.get<ReadingGoalWithProgress | null>(
      `/reading-goals/current/${userId}`,
    );
  },

  // Get goal progress
  getProgress: (id: string) => {
    return apiClient.get<{
      goal: ReadingGoal;
      progress: ReadingGoalWithProgress['progress'];
    }>(`/reading-goals/${id}/progress`);
  },

  // Create goal
  create: (data: CreateReadingGoalDto) => {
    return apiClient.post<ReadingGoal>('/reading-goals', data);
  },

  // Update goal
  update: (id: string, data: Partial<CreateReadingGoalDto>) => {
    return apiClient.patch<ReadingGoal>(`/reading-goals/${id}`, data);
  },

  // Delete goal
  delete: (id: string) => {
    return apiClient.delete<ReadingGoal>(`/reading-goals/${id}`);
  },
};
