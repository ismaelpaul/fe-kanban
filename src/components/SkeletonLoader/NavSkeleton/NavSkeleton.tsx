import { useWindowDimensions } from '@/hooks';

import { Logo } from '@/components/SVGComponents/Logo';
import { LogoMobile } from '@/components/SVGComponents/LogoMobile';
import { UserProfileSkeleton } from '../UserProfileSkeleton';
import { TeamMembersSkeleton } from '../TeamMembersSkeleton';
import { TeamsListSkeleton } from '../TeamsListSkeleton';

const NavSkeleton = () => {
	const { width } = useWindowDimensions();
	const isMobile = width < 768;
	return (
		<>
			<div className="bg-white dark:bg-dark-grey flex items-center justify-between h-[10vh] px-4 sticky inset-0 z-40 shadow-lg">
				<div className="w-full flex items-center gap-4 tablet:gap-6 h-full">
					{isMobile ? <LogoMobile /> : <Logo />}
					<div className="hidden tablet:inline-block h-full tablet:border-r border-lines-light dark:border-lines-dark"></div>
					<div className="flex items-center justify-between grow">
						<TeamsListSkeleton />
						<TeamMembersSkeleton />
						<UserProfileSkeleton />
					</div>
				</div>
			</div>
		</>
	);
};

export { NavSkeleton };
