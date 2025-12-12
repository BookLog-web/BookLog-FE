import { apiClient } from '../api-client';
import type { Book, CreateBookDto, PaginatedResponse, NaverBookSearchResponse } from '@/src/types';

export const booksApi = {
  // Search books from Naver API
  searchNaver: (query: string, display: number = 20, start: number = 1) => {
    return apiClient.get<NaverBookSearchResponse>('/books/search', {
      query,
      display,
      start,
    });
  },

  // Get all books with pagination and search
  getAll: (params?: {
    search?: string;
    author?: string;
    publisher?: string;
    page?: number;
    limit?: number;
  }) => {
    return apiClient.get<PaginatedResponse<Book>>('/books', params);
  },

  // Get book by ID
  getById: (id: string) => {
    return apiClient.get<Book>(`/books/${id}`);
  },

  // Create new book
  create: (data: CreateBookDto) => {
    return apiClient.post<Book>('/books', data);
  },

  // Update book
  update: (id: string, data: Partial<CreateBookDto>) => {
    return apiClient.patch<Book>(`/books/${id}`, data);
  },

  // Delete book
  delete: (id: string) => {
    return apiClient.delete<Book>(`/books/${id}`);
  },
};
