import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/kanbanApi';
import { User } from '../interfaces/IUser';
import useUserStore from '../store/userStore';

const useFetchUser = () => {
	const setUser = useUserStore((state) => state.setUser);

	const queryKey = ['user'];

	const { data, isLoading, isError } = useQuery(queryKey, getUser);

	const { user } = (data as User) || { user: [] };

	setUser(user);

	return { user, isLoading, isError };
};

export default useFetchUser;
