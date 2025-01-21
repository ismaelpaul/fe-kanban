import { Team } from '@/interfaces/ITeams';
import { useTeamsStore } from '@/store/teams';

type TeamUpdatedHandler = {
	type: string;
	team: Team;
};

export const teamUpdatedHandler = (data: TeamUpdatedHandler) => {
	console.log(data);

	const { setSelectedTeam } = useTeamsStore.getState();

	setSelectedTeam(data.team);
};
