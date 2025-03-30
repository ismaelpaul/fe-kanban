import { useQueryClient } from '@tanstack/react-query';
type CacheKey = [string, number?];

const useCache = <T>(key: CacheKey): T | undefined => {
	const queryClient = useQueryClient();
	const cachedData = queryClient.getQueryData(key) as T | undefined;

	return cachedData;
};

export { useCache };
