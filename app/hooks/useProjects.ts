import { getProjects } from "@/lib/getData";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useProjects = (locale: string) => {
    const queryClient= useQueryClient()
  const {
    data: projects,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["projects",locale],
    queryFn: () => getProjects(locale),
  });

  return { projects, error, isFetching, isLoading, refetch};
};
