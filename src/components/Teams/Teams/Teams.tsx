import { Team } from '@/interfaces/ITeams';

type TeamsProps = {
	selectedTeam: Team;
};

const Teams = ({ selectedTeam }: TeamsProps) => {
	return <div className="text-white">{selectedTeam.name}</div>;
};

export { Teams };
