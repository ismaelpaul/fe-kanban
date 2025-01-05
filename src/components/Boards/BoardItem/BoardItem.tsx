import { BoardIcon } from '@/components/SVGComponents/BoardIcon';
import { Board } from '@/interfaces/IBoard';
import { memo } from 'react';

type BoardItemProps = {
	board: Board;
	isSelected: boolean;
	isHovering: boolean;
	onMouseOver: () => void;
	onMouseOut: () => void;
	onSelect: () => void;
};

const BoardItem = memo(
	({
		board,
		isSelected,
		isHovering,
		onMouseOver,
		onMouseOut,
		onSelect,
	}: BoardItemProps) => {
		const boardIconClass = isSelected
			? 'transition ease-in-out duration-300 fill-white'
			: '';

		return (
			<div
				onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
				onClick={onSelect}
				className={`flex items-center gap-3 h-12 text-m-heading pl-6 mr-6 rounded-e-full cursor-pointer transition ease-in-out duration-300 hover:bg-purple/10 dark:hover:bg-white ${
					isSelected ? 'bg-purple pointer-events-none' : ''
				}`}
			>
				<BoardIcon
					iconClass={`${boardIconClass} ${
						isHovering
							? 'transition ease-in-out duration-300 fill-purple'
							: 'fill-medium-white'
					}`}
				/>
				<nav
					className={` ${isSelected ? 'text-white' : 'text-medium-grey'} ${
						isHovering ? 'transition ease-in-out duration-300 text-purple' : ''
					}`}
				>
					{board.name}
				</nav>
			</div>
		);
	}
);

export { BoardItem };
