import { useQuery } from '@tanstack/react-query';
import { getAllBoards } from '../api/kanbanApi';
import { Boards } from '../interfaces/IBoard';
import { useNavigate } from 'react-router-dom';

const useFetchBoards = () => {
	const navigate = useNavigate();
	const queryKey = ['boards'];

	const { data, isLoading, isError } = useQuery(queryKey, getAllBoards);

	const { boards } = (data as Boards) || { boards: [] };

	if (isError) navigate('/login');

	return { boards, isLoading, isError };
};

export default useFetchBoards;
