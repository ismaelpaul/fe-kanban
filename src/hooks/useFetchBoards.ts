import { useQuery } from '@tanstack/react-query';
import { getAllBoards } from '../api/kanbanApi';
import { Boards } from '../interfaces/IBoard';

const useFetchBoards = () => {
	const queryKey = ['boards'];

	const { data, isLoading, isError } = useQuery(queryKey, getAllBoards);

	const { boards } = (data as Boards) || { boards: [] };

	return { boards, isLoading, isError };
};

export default useFetchBoards;
