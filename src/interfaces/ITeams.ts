export interface Team {
	team_id: number;
	name: string;
}

export interface Teams {
	teams: Team[];
}

export interface TeamMember {
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
	role: string;
}

export interface TeamSubmit {
	team_id?: number;
	name: string;
}

export interface TeamMembers {
	teamMembers: TeamMember[];
}

export interface ITeamsStore {
	selectedTeam: Team;
	setSelectedTeam: (newSelectedTeam: Team) => void;
}
