import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '..';
import { getTeams } from '@/api/kanbanApi';
import { Teams } from '@/interfaces/ITeams';

const useFetchTeams = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const queryKey = ['teams'];

	const { data, isLoading, isError } = useQuery(queryKey, getTeams, {
		onError: (err) => {
			if (err instanceof Error) {
				toast.error(err.message);
			}
			navigate('/login');
		},
	});

	const { teams } = (data as Teams) || { teams: [] };

	return { teams, isLoading, isError };
};

export { useFetchTeams };
