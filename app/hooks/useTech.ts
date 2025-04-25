import { getTech } from "@/lib/getData";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTech(locale: string) {
  const queryClient = useQueryClient();
  const {
    data: tech,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["tech", locale],
    queryFn: () => getTech(locale),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry twice before failing
  });

  const mutate = () => {
    queryClient.invalidateQueries({ queryKey: ["tech", locale] });
  };

  return {
    tech,
    error,
    isLoading,
    isFetching,
    refetch,
    mutate,
  };
}