import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

// استخدام cache لإنشاء عميل استعلام واحد لكل طلب
export const getQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
}));