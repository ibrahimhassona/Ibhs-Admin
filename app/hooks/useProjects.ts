import { getProjects } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";

export const useProjects = (locale: string) => {
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
