import { ShowSidebarIcon } from '@/components/SVGComponents/ShowSidebarIcon';

interface Props {
	setIsAllBoardsOpen: (arg: boolean) => void;
	isAllBoardsOpen: boolean;
}

const ToggleSidebar = ({ setIsAllBoardsOpen, isAllBoardsOpen }: Props) => {
	return (
		<aside
			onClick={() => {
				setIsAllBoardsOpen(true);
			}}
			className={`hidden transition-all ease-in-out duration-300 absolute ${
				isAllBoardsOpen ? 'scale-0 -left-14' : 'scale-100 left-0'
			} tablet:flex items-center justify-center bottom-4  bg-purple hover:bg-purple-hover w-14 h-12 rounded-r-full cursor-pointer`}
		>
			<ShowSidebarIcon />
		</aside>
	);
};

export { ToggleSidebar };
