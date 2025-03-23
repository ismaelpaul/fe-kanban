import { Team } from '@/interfaces/ITeams';

import { LogoMobile } from '@/components/SVGComponents/LogoMobile';
import { TeamMembers } from '@/components/Teams/TeamMembers/TeamMembers';
import { TeamsList } from '@/components/Teams/TeamsList';
import { UserProfile } from '@/components/UserProfile/UserProfile';

type MobileNavProps = {
	selectedTeam: Team;
	teams: Team[];
};

const MobileNav = ({ selectedTeam, teams }: MobileNavProps) => {
	return (
		<div className="bg-white dark:bg-dark-grey px-4 py-2 sticky inset-0 z-40 shadow-lg">
			<div className="w-full flex items-center gap-4 tablet:gap-6 h-full">
				<LogoMobile />
				<div className="hidden tablet:inline-block h-full tablet:border-r border-lines-light dark:border-lines-dark"></div>
				<div className="flex items-center justify-between grow">
					<TeamsList selectedTeam={selectedTeam} teams={teams} />
					<UserProfile />
				</div>
			</div>
			<hr className="my-2 border-medium-grey/30" />
			<TeamMembers teamId={selectedTeam.team_id} />
		</div>
	);
};

export { MobileNav };
