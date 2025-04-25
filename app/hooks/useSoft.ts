import { getSoft } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";

export const useSoft = (locale: string) => {
  const {
    data: skills,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["soft",locale],
    queryFn: () => getSoft(locale),
  });

  return { skills, error, isFetching, isLoading, refetch};
};
