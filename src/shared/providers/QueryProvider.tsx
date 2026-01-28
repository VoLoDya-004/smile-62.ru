import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () => 
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            refetchOnMount: true, 
            refetchOnReconnect: true,
            structuralSharing: true, 
          },
          mutations: {
            retry: 0,
          }
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  )
}