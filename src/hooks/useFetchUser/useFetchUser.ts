import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/api/kanbanApi';

import { UserInfo } from '@/interfaces/IUser';

const useFetchUser = ({ enabled = true } = {}) => {
	const queryKey = ['user'];

	const { data, isLoading, isError } = useQuery(queryKey, getUser, {
		enabled,
	});

	const isAuthLoading = isLoading;

	const user = data ? (data.user as UserInfo) : null;
	const isAuthenticated = !!user && !isAuthLoading && !isError;

	return { user, isAuthLoading, isError, isAuthenticated };
};

export { useFetchUser };
