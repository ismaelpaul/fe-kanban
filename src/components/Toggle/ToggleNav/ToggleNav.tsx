import { ShowSidebarIcon } from '@/components/SVGComponents/ShowSidebarIcon';

interface NavProps {
	setIsSidebarNavOpen: (arg: boolean) => void;
	isSidebarNavOpen: boolean;
}

const ToggleNav = ({ setIsSidebarNavOpen, isSidebarNavOpen }: NavProps) => {
	return (
		<aside
			onClick={() => {
				setIsSidebarNavOpen(true);
			}}
			className={`hidden transition-all ease-in-out duration-300 absolute ${
				isSidebarNavOpen ? 'scale-0 -left-14' : 'scale-100 left-0'
			} tablet:flex items-center justify-center bottom-12  bg-purple hover:bg-purple-hover w-14 h-12 rounded-r-full cursor-pointer`}
		>
			<ShowSidebarIcon />
		</aside>
	);
};

export { ToggleNav };
