import { useMemo } from 'react';

import { UserInfo } from '@/interfaces/IUser';
import { TeamMember } from '@/interfaces/ITeams';
import { useQueryClient } from '@tanstack/react-query';

type CachedUserData = { user: UserInfo };
type CachedTeamMembersData = { teamMembers: TeamMember[] };

const useAdminCheck = (teamId: number) => {
	const queryClient = useQueryClient();

	const userCachedData = queryClient.getQueryData<CachedUserData>(['user']);
	const user = userCachedData?.user;

	const teamMembersCachedData = queryClient.getQueryData<CachedTeamMembersData>(
		['team_members', teamId]
	);
	const teamMembers = teamMembersCachedData?.teamMembers;

	const isAdmin = useMemo(() => {
		if (teamMembers && user?.user_id) {
			return teamMembers.some(
				(member: TeamMember) =>
					member.user_id === user.user_id && member.role === 'admin'
			);
		}
		return false;
	}, [teamMembers, user?.user_id]);

	return { isAdmin };
};

export { useAdminCheck };
