import { useEffect, useState } from 'react';

import { useFetchBoards } from '@/hooks';

import { ColumnsList } from '@/components/Columns/ColumnsList';
import { SidebarNav } from '@/components/Nav/Nav/SidebarNav';
import { ToggleSidebar } from '@/components/Toggle/ToggleSidebar';

import { useTeamsStore } from '@/store/teams';
import { useBoardStore } from '@/store/boards';

const Dashboard = () => {
	const [isSidebarNavOpen, setIsSidebarNavOpen] = useState(false);

	const selectedTeam = useTeamsStore((state) => state.selectedTeam);
	const { selectedBoard, setSelectedBoard } = useBoardStore();

	const teamId = selectedTeam.team_id;

	const { boards, isLoading } = useFetchBoards(teamId);

	useEffect(() => {
		if (boards.length > 0) {
			setSelectedBoard(boards[0]);
		}
	}, [boards]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{isSidebarNavOpen && (
				<SidebarNav setIsSidebarNavOpen={setIsSidebarNavOpen} boards={boards} />
			)}
			<div className="flex flex-col ml-6">
				<h1 className="text-black dark:text-white text-l-heading my-4">
					{selectedBoard.name}
				</h1>
				<ColumnsList />
			</div>
			<ToggleSidebar
				isSidebarNavOpen={isSidebarNavOpen}
				setIsSidebarNavOpen={setIsSidebarNavOpen}
			/>
		</>
	);
};

export { Dashboard };
