import { useEffect, useMemo } from 'react';

import { useFetchTeams, useWindowDimensions } from '@/hooks';

import { useTeamsStore } from '@/store/teams';

import { NavSkeleton } from '@/components/SkeletonLoader/NavSkeleton';
import { MobileNav } from '../MobileNav';
import { DesktopNav } from '../DesktopNav';

const DashboardNav = () => {
	const { width } = useWindowDimensions();
	const isMobile = useMemo(() => width < 768, [width]);

	const { selectedTeam, setSelectedTeam } = useTeamsStore();
	const { teams, isLoading } = useFetchTeams();

	useEffect(() => {
		if (!selectedTeam.team_id && teams.length > 0) {
			setSelectedTeam(teams[0]);
		}
	}, [teams, selectedTeam, setSelectedTeam]);

	if (isLoading) return <NavSkeleton />;

	return isMobile ? (
		<MobileNav selectedTeam={selectedTeam} teams={teams} />
	) : (
		<DesktopNav selectedTeam={selectedTeam} teams={teams} />
	);
};

export { DashboardNav };
