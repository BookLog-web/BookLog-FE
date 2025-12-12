import type { ApiError } from '@/src/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error?: string,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ApiError;
    try {
      errorData = await response.json();
      console.error('❌ [API CLIENT] Error response:', errorData);
    } catch {
      console.error('❌ [API CLIENT] Failed to parse error response');
      throw new ApiClientError(
        'An error occurred',
        response.status,
        response.statusText,
      );
    }

    throw new ApiClientError(
      errorData.message || 'An error occurred',
      errorData.statusCode || response.status,
      errorData.error,
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add JWT token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

export const apiClient = {
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const url = new URL(`${API_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    console.log('🌐 [API CLIENT] GET Request:', {
      endpoint,
      params,
      fullUrl: url.toString(),
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    console.log('📡 [API CLIENT] Response:', {
      status: response.status,
      ok: response.ok,
    });

    const result = await handleResponse<T>(response);
    console.log('✅ [API CLIENT] GET Result:', result);
    return result;
  },

  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    console.log('🌐 [API CLIENT] POST Request:', {
      endpoint,
      data,
      fullUrl: `${API_URL}${endpoint}`,
    });

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log('📡 [API CLIENT] Response:', {
      status: response.status,
      ok: response.ok,
    });

    const result = await handleResponse<T>(response);
    console.log('✅ [API CLIENT] POST Result:', result);
    return result;
  },

  patch: async <T>(endpoint: string, data?: any): Promise<T> => {
    console.log('🌐 [API CLIENT] PATCH Request:', {
      endpoint,
      data,
      fullUrl: `${API_URL}${endpoint}`,
    });

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log('📡 [API CLIENT] Response:', {
      status: response.status,
      ok: response.ok,
    });

    const result = await handleResponse<T>(response);
    console.log('✅ [API CLIENT] PATCH Result:', result);
    return result;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    return handleResponse<T>(response);
  },
};
