import { useNavigate } from 'react-router-dom';
import { useToast } from '../useToast';
import { useQuery } from '@tanstack/react-query';
import { getTeamMembersByTeamId } from '@/api/kanbanApi';
import { TeamMembers } from '@/interfaces/ITeams';

const useFetchTeamMembers = (teamId: number) => {
	const navigate = useNavigate();
	const toast = useToast();
	const queryKey = ['team_members', teamId];

	const { data, isLoading, isError } = useQuery(
		queryKey,
		() => (teamId ? getTeamMembersByTeamId(teamId) : null),
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

	const { teamMembers } = (data as TeamMembers) || { teamMembers: [] };

	return { teamMembers, isLoading, isError };
};

export { useFetchTeamMembers };
