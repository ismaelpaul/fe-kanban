import { useQuery, QueryKey, UseQueryResult } from '@tanstack/react-query';

interface UseFetchProps<TData> {
	queryKey: QueryKey;
	queryFn: () => Promise<TData>;
}

function useFetch<TData>({
	queryKey,
	queryFn,
}: UseFetchProps<TData>): UseQueryResult<TData> {
	return useQuery(queryKey, queryFn);
}

export default useFetch;
