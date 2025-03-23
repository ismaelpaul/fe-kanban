import { motion } from 'framer-motion';

import { useTeamsStore } from '@/store/teams';

import { useCache } from '@/hooks/useCache';

import { Boards } from '@/interfaces/IBoard';

import { BoardList } from '@/components/Boards/BoardList';
import { ToggleColorMode } from '@/components/Toggle/ToggleColorMode';
import { HideSidebarNav } from '../HideSidebarNav';
import { CreateNewBoard } from '@/components/Boards/CreateNewBoard';

const SidebarNav = () => {
	const selectedTeam = useTeamsStore((state) => state.selectedTeam);

	const teamId = selectedTeam.team_id;

	const cachedBoards = useCache<Boards>(['boards', teamId]);

	const boards = cachedBoards?.boards || [];

	return (
		<motion.div
			initial={{ transform: 'translateX(-10rem)' }}
			animate={{ transform: 'translateX(0rem)' }}
			transition={{ duration: 0.25 }}
			className={` flex flex-col
			
			bg-white dark:bg-dark-grey w-[16.5rem] absolute tablet:static top-20 py-[1.188rem] z-40 tablet:ml-0 tablet:top-0 pr-6 `}
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
