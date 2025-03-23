import { useFetchTeamMembers } from '@/hooks/useFetchTeamMembers';
import { TeamMember } from '@/interfaces/ITeams';
import { TeamMembersSkeleton } from '@/components/SkeletonLoader/TeamMembersSkeleton';

type TeamMembersProps = {
	teamId: number;
};

const TeamMembers = ({ teamId }: TeamMembersProps) => {
	const { teamMembers, isLoading } = useFetchTeamMembers(teamId);

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		e.currentTarget.src = 'https://i.ibb.co/4pDNDk1/avatar.png';
	};

	return (
		<div className="flex items-center justify-center">
			{isLoading && <TeamMembersSkeleton />}
			{teamMembers.map((member: TeamMember, index: number) => {
				return (
					<div
						key={member.user_id}
						className={`relative h-8 w-8 tablet:h-10 tablet:w-10 laptop:h-12 laptop:w-12 overflow-hidden rounded-full border-2 border-white dark:border-dark-grey ${
							index > 0 ? '-ml-4 tablet:-ml-3' : 'z-10'
						}`}
					>
						<img
							src={member.avatar}
							alt="Profile image"
							className="h-full w-full object-cover"
							onError={handleImageError}
						/>
					</div>
				);
			})}
		</div>
	);
};

export { TeamMembers };
