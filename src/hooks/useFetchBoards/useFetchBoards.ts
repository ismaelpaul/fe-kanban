import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { useToast } from '../useToast';

import { getBoardsByTeamId } from '@/api/kanbanApi';

import { Boards } from '@/interfaces/IBoard';

const useFetchBoards = (teamId: number) => {
	const navigate = useNavigate();
	const toast = useToast();
	const queryKey = ['boards', teamId];

	const { data, isLoading, isError } = useQuery(
		queryKey,
		() => (teamId ? getBoardsByTeamId(teamId) : null),

		{
			enabled: teamId !== 0,
			onError: (err) => {
				if (err instanceof Error) {
					toast.error(err.message);
				}
				navigate('/login');
			},
		}
	);

	const { boards } = (data as Boards) || { boards: [] };
	const loading = teamId === 0 ? false : isLoading;

	return { boards, isLoading: loading, isError };
};

export { useFetchBoards };
