import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { useFetchBoards, useWindowDimensions } from '@/hooks';

import { useTeamsStore } from '@/store/teams';
import { useBoardStore } from '@/store/boards';
import { useModalStore } from '@/store/modals';

import { ColumnsList } from '@/components/Columns/ColumnsList';
import { ToggleNav } from '@/components/Toggle/ToggleNav/ToggleNav';
import { SelectedBoard } from '@/components/Boards/SelectedBoard';
import { SidebarNav } from '@/components/Nav/SidebarNav/SidebarNav';
import { Button } from '@/components/Button';
import { AddNewTaskModal } from '@/components/Tasks/AddNewTaskModal';
import { AddNewBoardModal } from '@/components/Boards/AddNewBoardModal';
import { EditBoardModal } from '@/components/Boards/EditBoardModal';
import { MainSkeleton } from '@/components/SkeletonLoader/MainSkeleton';
import { EditTeamModal } from '@/components/Teams/EditTeamModal';
import { AddNewTeamModal } from '@/components/Teams/AddNewTeamModal';
import { TeamInvitationModal } from '@/components/Teams/TeamInvitationModal/TeamInvitationModal';

const Dashboard = () => {
	const [boardHasColumns, setBoardHasColumns] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const { width } = useWindowDimensions();

	const { modals, openModal } = useModalStore();

	const selectedTeam = useTeamsStore((state) => state.selectedTeam);

	const { selectedBoard, setSelectedBoard } = useBoardStore();

	const teamId = selectedTeam.team_id;

	const { boards, isLoading } = useFetchBoards(teamId);

	useEffect(() => {
		if (boards.length > 0) {
			setSelectedBoard(boards[0]);
		}
	}, [selectedTeam, boards, setSelectedBoard]);

	const btnAddNewTaskClass = `bg-purple py-2.5 px-5 rounded-full text-white tablet:text-m-heading transition ease-in-out duration-300 grow-1 basis-full tablet:basis-auto tablet:ml-auto ${
		boardHasColumns
			? 'enabled:hover:bg-purple-hover'
			: 'cursor-not-allowed opacity-75'
	}`;

	const openAddNewTaskModal = () => openModal('addNewTaskModal');

	const isSidebarOpen = useModalStore((state) => state.modals.sidebarNav);

	useEffect(() => {
		const isMobileScreen = width < 768;
		if (isMobileScreen !== isMobile) {
			setIsMobile(isMobileScreen);
		}
	}, [width, isMobile]);

	return (
		<>
			{isLoading && <MainSkeleton />}

			{modals.editBoardModal && <EditBoardModal />}
			{modals.addNewBoardModal && <AddNewBoardModal />}
			{modals.addNewTaskModal && <AddNewTaskModal />}

			{modals.editTeamModal && <EditTeamModal />}
			{modals.addNewTeamModal && <AddNewTeamModal />}
			{modals.teamInvitationModal && <TeamInvitationModal />}

			<SidebarNav />

			<motion.div
				animate={{
					marginLeft: isMobile ? '0rem' : isSidebarOpen ? '16.5rem' : '0rem', // Don't move on mobile
				}}
				transition={{
					duration: 0.25,
					ease: 'easeInOut',
					delay: modals.sidebarNav ? 0 : -0.01,
				}}
				className="flex flex-col px-6 overflow-x-scroll no-scrollbar w-full bg-light-bg dark:bg-dark-bg"
			>
				<div className="flex items-center justify-between flex-wrap tablet:flex-nowrap gap-4 my-4">
					<SelectedBoard selectedBoard={selectedBoard} />
					<Button
						onClick={openAddNewTaskModal}
						buttonText={'+ Add New Task'}
						buttonClass={btnAddNewTaskClass}
					/>
				</div>
				<ColumnsList
					boardHasColumns={boardHasColumns}
					setBoardHasColumns={setBoardHasColumns}
				/>
			</motion.div>
			<ToggleNav />
		</>
	);
};

export { Dashboard };
