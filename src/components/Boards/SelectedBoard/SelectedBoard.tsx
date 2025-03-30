import React, { useEffect, useState } from 'react';

import { Board } from '@/interfaces/IBoard';

import { useWebSocket, useWindowDimensions } from '@/hooks';
import { useAdminCheck } from '@/hooks/useAdminCheck';

import { useTeamsStore } from '@/store/teams';
import { useModalStore } from '@/store/modals';

import { SelectedBoardMobile } from './SelectedBoardMobile';
import { KebabMenuIcon } from '@/components/SVGComponents/KebabMenuIcon';
import { KebabMenuModal } from '@/components/KebabMenu/KebabMenuModal';
import { DeleteModal } from '@/components/DeleteModal/DeleteModal';

export type SelectedBoardProps = {
	selectedBoard: Board;
};

const SelectedBoard = React.memo(({ selectedBoard }: SelectedBoardProps) => {
	const [isMobile, setIsMobile] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const { modals, openModal } = useModalStore();

	const { sendMessage } = useWebSocket();

	const { width } = useWindowDimensions();

	const selectedTeam = useTeamsStore.getState().selectedTeam;

	const teamId = selectedTeam.team_id;

	const { isAdmin } = useAdminCheck(teamId);

	const handleKebabMenu = () => {
		openModal('kebabMenu');
	};

	const handleDeleteBoard = () => {
		sendMessage('DELETE_BOARD', { board_id: selectedBoard.board_id });
		setIsDeleteModalOpen(false);
	};

	useEffect(() => {
		const isMobileScreen = width < 768;
		if (isMobileScreen !== isMobile) {
			setIsMobile(isMobileScreen);
		}
	}, [width, isMobile]);

	return (
		<>
			{isMobile ? (
				<SelectedBoardMobile selectedBoard={selectedBoard} />
			) : (
				<h1 className="text-black dark:text-white text-l-heading">
					{selectedBoard.name}
				</h1>
			)}
			{isAdmin && (
				<div onClick={handleKebabMenu} className="cursor-pointer">
					<KebabMenuIcon />
				</div>
			)}
			{modals.kebabMenu && (
				<KebabMenuModal
					editText={'Edit Board'}
					deleteText={'Delete Board'}
					menuPosition={'top-[3rem] left-[2rem]'}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					isParentTaskModal={false}
				/>
			)}
			{isDeleteModalOpen && (
				<DeleteModal
					onClick={handleDeleteBoard}
					itemName={selectedBoard.name}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					itemType={'board'}
				/>
			)}
		</>
	);
});

export { SelectedBoard };
