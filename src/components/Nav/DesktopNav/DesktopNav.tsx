import { Team } from '@/interfaces/ITeams';

import { Logo } from '@/components/SVGComponents/Logo';
import { TeamMembers } from '@/components/Teams/TeamMembers/TeamMembers';
import { TeamsList } from '@/components/Teams/TeamsList';
import { UserProfile } from '@/components/UserProfile/UserProfile';

type DesktopNavProps = {
	selectedTeam: Team;
	teams: Team[];
};

const DesktopNav = ({ selectedTeam, teams }: DesktopNavProps) => (
	<div className="bg-white dark:bg-dark-grey flex items-center justify-between h-[10vh] px-4 sticky inset-0 z-40 shadow-lg">
		<div className="w-full flex items-center gap-4 tablet:gap-6 h-full">
			<Logo />
			<div className="hidden tablet:inline-block h-full tablet:border-r border-lines-light dark:border-lines-dark"></div>
			<div className="flex items-center justify-between grow">
				<TeamsList selectedTeam={selectedTeam} teams={teams} />
				<TeamMembers teamId={selectedTeam.team_id} />
				<UserProfile />
			</div>
		</div>
	</div>
);

export { DesktopNav };
