import { useQuery } from '@tanstack/react-query';
import { getAllBoards } from '../api/kanbanApi';
import { Boards } from '../interfaces/IBoard';
import { useEffect } from 'react';

const useFetchBoards = () => {
	const queryKey = ['boards'];

	const { data, isLoading, isError, refetch } = useQuery(
		queryKey,
		getAllBoards,
		{
			enabled: false,
		}
	);

	const { boards } = (data as Boards) || { boards: [] };

	useEffect(() => {
		refetch();
	}, []);

	return { boards, isLoading, isError };
};

export default useFetchBoards;
