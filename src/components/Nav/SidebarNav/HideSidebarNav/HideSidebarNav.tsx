import { useState } from 'react';

import { useModalStore } from '@/store/modals';

import { HideSidebarIcon } from '@/components/SVGComponents/HideSidebarIcon';

const HideSidebarNav = () => {
	const [isHovering, setIsHovering] = useState(false);

	const { closeModal } = useModalStore();

	return (
		<div
			onClick={() => {
				closeModal('sidebarNav');
			}}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className="cursor-pointer hidden tablet:flex items-center gap-3 mt-auto pl-6 w-60 h-12 rounded-e-full transition ease-in-out duration-300 hover:bg-purple/10 dark:hover:bg-white hover:text-purple"
		>
			<HideSidebarIcon
				iconClass={`${
					isHovering
						? 'transition ease-in-out duration-300 fill-purple'
						: 'fill-medium-grey'
				}`}
			/>
			<span
				className={`text-m-heading ${
					isHovering
						? 'transition ease-in-out duration-300 text-purple'
						: 'text-medium-grey'
				}`}
			>
				Hide Sidebar
			</span>
		</div>
	);
};

export { HideSidebarNav };
