import { apiClient } from '../api-client';
import type {
  ReadingLog,
  CreateReadingLogDto,
  UpdateProgressDto,
  FinishReadingDto,
  PaginatedResponse,
  ReadingStatus,
} from '@/src/types';

export const readingLogsApi = {
  // Get all reading logs
  getAll: (params?: {
    userId?: string;
    status?: ReadingStatus;
    page?: number;
    limit?: number;
  }) => {
    return apiClient.get<PaginatedResponse<ReadingLog>>(
      '/reading-logs',
      params,
    );
  },

  // Get reading log by ID
  getById: (id: string) => {
    return apiClient.get<ReadingLog>(`/reading-logs/${id}`);
  },

  // Get current reading books
  getCurrent: (userId: string) => {
    return apiClient.get<ReadingLog[]>(`/reading-logs/current/${userId}`);
  },

  // Get completed books
  getCompleted: (userId: string, page?: number, limit?: number) => {
    return apiClient.get<PaginatedResponse<ReadingLog>>(
      `/reading-logs/completed/${userId}`,
      { page, limit },
    );
  },

  // Get to-read list
  getToRead: (userId: string) => {
    return apiClient.get<ReadingLog[]>(`/reading-logs/to-read/${userId}`);
  },

  // Create reading log
  create: (data: CreateReadingLogDto) => {
    return apiClient.post<ReadingLog>('/reading-logs', data);
  },

  // Update reading log
  update: (id: string, data: Partial<ReadingLog>) => {
    return apiClient.patch<ReadingLog>(`/reading-logs/${id}`, data);
  },

  // Update progress
  updateProgress: (id: string, data: UpdateProgressDto) => {
    return apiClient.patch<ReadingLog>(`/reading-logs/${id}/progress`, data);
  },

  // Finish reading
  finish: (id: string, data: FinishReadingDto) => {
    return apiClient.patch<ReadingLog>(`/reading-logs/${id}/finish`, data);
  },

  // Delete reading log
  delete: (id: string) => {
    return apiClient.delete<ReadingLog>(`/reading-logs/${id}`);
  },
};
