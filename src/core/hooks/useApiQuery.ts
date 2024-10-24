import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Api } from '@/core/trpc';

type ApiQueryFunction = typeof Api.user.findFirst.useQuery;

export function useApiQuery<TData, TError>(
  queryFn: ApiQueryFunction,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryFn'>
) {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery<TData, TError>({
    ...options,
    queryFn: queryFn as any,
    onError: (error) => {
      enqueueSnackbar(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`, { variant: 'error' });
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
}
