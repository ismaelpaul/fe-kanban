import { useQuery } from '@tanstack/react-query';
import { getAllBoards } from '../api/kanbanApi';
import { Boards } from '../interfaces/IBoard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchBoards = () => {
	const navigate = useNavigate();
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

	if (isError) navigate('/login');

	return { boards, isLoading, isError };
};

export default useFetchBoards;
