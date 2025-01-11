import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/api/kanbanApi';

import { UserInfo } from '@/interfaces/IUser';

const useFetchUser = () => {
	const queryKey = ['user'];

	const { data, isLoading, isError } = useQuery(queryKey, getUser);

	const user = data ? (data.user as UserInfo) : null;

	return { user, isLoading, isError };
};

export { useFetchUser };
