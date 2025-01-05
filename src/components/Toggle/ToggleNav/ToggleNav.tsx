import { useModalStore } from '@/store/modals';

import { ShowSidebarIcon } from '@/components/SVGComponents/ShowSidebarIcon';

const ToggleNav = () => {
	const { modals, openModal } = useModalStore();

	return (
		<aside
			onClick={() => {
				openModal('sidebarNav');
			}}
			className={`hidden transition-all ease-in-out duration-300 absolute ${
				modals.sidebar ? 'scale-0 -left-14' : 'scale-100 left-0'
			} tablet:flex items-center justify-center bottom-12  bg-purple hover:bg-purple-hover w-14 h-12 rounded-r-full cursor-pointer`}
		>
			<ShowSidebarIcon />
		</aside>
	);
};

export { ToggleNav };
