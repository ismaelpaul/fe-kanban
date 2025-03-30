import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { useTeamsStore } from '@/store/teams';
import { useModalStore } from '@/store/modals';

import { useCache } from '@/hooks/useCache';
import { useWindowDimensions } from '@/hooks';

import { Boards } from '@/interfaces/IBoard';

import { BoardList } from '@/components/Boards/BoardList';
import { ToggleColorMode } from '@/components/Toggle/ToggleColorMode';
import { HideSidebarNav } from '../HideSidebarNav';
import { CreateNewBoard } from '@/components/Boards/CreateNewBoard';

const SidebarNav = () => {
	const [isMobile, setIsMobile] = useState(false);

	const { width } = useWindowDimensions();

	const { modals } = useModalStore();

	const selectedTeam = useTeamsStore((state) => state.selectedTeam);

	const teamId = selectedTeam.team_id;

	const cachedBoards = useCache<Boards>(['boards', teamId]);

	const boards = cachedBoards?.boards || [];

	useEffect(() => {
		const isMobileScreen = width < 768;
		if (isMobileScreen !== isMobile) {
			setIsMobile(isMobileScreen);
		}
	}, [width, isMobile]);

	return (
		<motion.div
			initial={isMobile ? { x: '3rem', y: '-100%' } : { x: '-16.5rem' }}
			animate={
				modals.sidebarNav
					? isMobile
						? { x: '3rem', y: '3rem' }
						: { x: 0 }
					: isMobile
					? { y: '-100%' }
					: { x: '-16.5rem' }
			}
			transition={{ duration: 0.25, ease: 'easeInOut' }}
			className={`flex flex-col absolute left-0 top-0 ${
				isMobile ? 'pb-6 rounded-md' : 'pb-0 h-full'
			} bg-white dark:bg-dark-grey w-[16.5rem] z-40 pr-6`}
		>
			<span className="inline-block text-medium-grey text-12px font-semiBold tracking-2.4px my-[1.188rem] pl-6">
				ALL BOARDS ({boards.length})
			</span>

			<BoardList boards={boards} />

			<CreateNewBoard />

			<ToggleColorMode />

			<div className="grow-1 mt-auto">
				<HideSidebarNav />
			</div>
		</motion.div>
	);
};

export { SidebarNav };
