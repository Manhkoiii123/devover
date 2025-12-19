'use client';

import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface ValidationError {
  message: string;
  path?: string[];
}

interface ApiErrorResponse {
  message?: string | ValidationError | ValidationError[];
  error?: string;
  statusCode?: number;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.message) {
      if (typeof data.message === 'string') {
        return data.message;
      }

      if (Array.isArray(data.message)) {
        const firstError = data.message[0];
        return typeof firstError === 'string'
          ? firstError
          : firstError?.message || 'Validation error';
      }

      if (typeof data.message === 'object' && 'message' in data.message) {
        return data.message.message;
      }
    }

    return data?.error || error.message || 'Có lỗi xảy ra';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Có lỗi xảy ra';
}

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            const meta = mutation.options.meta as
              | { skipGlobalErrorToast?: boolean }
              | undefined;
            if (meta?.skipGlobalErrorToast) return;

            toast.error(getErrorMessage(error));
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
