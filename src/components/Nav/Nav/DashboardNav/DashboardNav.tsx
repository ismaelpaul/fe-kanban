import { useEffect } from 'react';

import { useFetchTeams, useWindowDimensions } from '@/hooks';

import { Logo } from '@/components/SVGComponents/Logo';
import { LogoMobile } from '@/components/SVGComponents/LogoMobile';
import { TeamMembers } from '@/components/Teams/TeamMembers/TeamMembers';
import { UserProfile } from '@/components/UserProfile/UserProfile';
import { Teams } from '@/components/Teams/Teams';

import { useTeamsStore } from '@/store/teams';

const DashboardNav = () => {
	const { width } = useWindowDimensions();
	const isMobile = width < 768;

	const { selectedTeam, setSelectedTeam } = useTeamsStore();

	const { teams, isLoading } = useFetchTeams();

	useEffect(() => {
		if (teams.length > 0) {
			setSelectedTeam(teams[0]);
		}
	}, [teams]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="bg-white dark:bg-dark-grey flex items-center justify-between h-16 px-4 sticky inset-0 z-40">
				<div className="w-full flex items-center gap-4 tablet:gap-6 h-full">
					{isMobile ? <LogoMobile /> : <Logo />}
					<div className="hidden tablet:inline-block h-full tablet:border-r border-lines-light dark:border-lines-dark"></div>
					<div className="flex items-center justify-between grow">
						<Teams selectedTeam={selectedTeam} />
						<TeamMembers teamId={selectedTeam.team_id} />
						<UserProfile />
					</div>
				</div>
			</div>
		</>
	);
};

export { DashboardNav };
