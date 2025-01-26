import { Dropdown } from '@/components/Dropdown/Dropdown';
import { Options } from '@/interfaces/IOptionsDropdown';
import { Team } from '@/interfaces/ITeams';
import { useModalStore } from '@/store/modals';
import { useTeamsStore } from '@/store/teams';
import { useEffect, useState } from 'react';

type TeamsProps = {
	selectedTeam: Team;
	teams: Team[];
};

const TeamsList = ({ selectedTeam, teams }: TeamsProps) => {
	const [selectedOption, setSelectedOption] = useState({
		id: selectedTeam.team_id,
		label: selectedTeam.name,
		value: selectedTeam.name,
	});

	const { setSelectedTeam } = useTeamsStore();

	const { openModal } = useModalStore();

	useEffect(() => {
		setSelectedOption({
			id: selectedTeam.team_id,
			label: selectedTeam.name,
			value: selectedTeam.name,
		});
	}, [selectedTeam]);

	const options = teams.map((team: Team) => {
		return {
			id: team.team_id,
			label: team.name,
			value: team.name,
		};
	});

	const handleOptionChange = (selectedOption: Options) => {
		const newTeam = teams.find((team) => team.team_id === selectedOption.id);
		if (newTeam) {
			setSelectedTeam(newTeam);
		}
	};

	const handleEditTeam = () => {
		openModal('editTeamModal');
	};

	const handleCreateNewTeam = () => {
		openModal('addNewTeamModal');
	};

	const handleInviteUser = () => {
		console.log('invite user to the team');
	};

	const actions = [
		{ label: 'Edit Team', onClick: handleEditTeam },
		{ label: 'Create New Team', onClick: handleCreateNewTeam },
		{ label: 'Invite User to Team', onClick: handleInviteUser },
	];

	return (
		<>
			<Dropdown
				selectedOption={selectedOption}
				options={options}
				setSelectedOption={handleOptionChange}
				actions={actions}
			/>
		</>
	);
};

export { TeamsList };
