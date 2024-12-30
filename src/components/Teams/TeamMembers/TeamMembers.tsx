import { useFetchTeamMembers } from '@/hooks/useFetchTeamMembers';
import { TeamMember } from '@/interfaces/ITeams';

type TeamMembersProps = {
	teamId: number;
};

const TeamMembers = ({ teamId }: TeamMembersProps) => {
	const { teamMembers, isLoading } = useFetchTeamMembers(teamId);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	return (
		<div className="flex">
			{teamMembers.map((member: TeamMember) => {
				return (
					<div
						key={member.user_id}
						className="h-12 w-12 overflow-hidden rounded-full border-2 border-purple"
					>
						<img src={member.avatar} alt="Profile image" />
					</div>
				);
			})}
		</div>
	);
};

export { TeamMembers };
