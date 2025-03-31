import { Team } from '@/interfaces/ITeams';
import { useTeamsStore } from '@/store/teams';

type TeamUpdatedHandler = {
	type: string;
	team: Team;
};

export const teamUpdatedHandler = (data: TeamUpdatedHandler) => {
	const { setSelectedTeam } = useTeamsStore.getState();

	setSelectedTeam(data.team);
};
