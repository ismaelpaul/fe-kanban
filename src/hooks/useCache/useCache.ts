import { useQueryClient } from '@tanstack/react-query';

const useCache = (key: (string | number)[]) => {
	const queryClient = useQueryClient();
	const cachedData = queryClient.getQueryData(key);

	return cachedData;
};

export { useCache };
