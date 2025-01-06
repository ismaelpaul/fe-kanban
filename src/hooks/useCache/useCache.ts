import { useQueryClient } from '@tanstack/react-query';
type CacheKey = [string, number?];

const useCache = (key: CacheKey) => {
	const queryClient = useQueryClient();
	const cachedData = queryClient.getQueryData(key);

	return cachedData;
};

export { useCache };
