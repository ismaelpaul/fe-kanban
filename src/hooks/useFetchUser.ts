import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/kanbanApi';
import { User } from '../interfaces/IUser';

const useFetchUser = () => {
	const queryKey = ['user'];

	const { data, isLoading, isError } = useQuery(queryKey, getUser);

	const { user } = (data as User) || { user: [] };

	return { user, isLoading, isError };
};

export default useFetchUser;
