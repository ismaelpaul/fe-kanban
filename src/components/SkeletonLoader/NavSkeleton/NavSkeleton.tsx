import { useWindowDimensions } from '@/hooks';

import { Skeleton } from '../Skeleton';
import { ChevronUp } from '@/components/SVGComponents/ChevronUp';
import { Button } from '@/components/Button';
import { Logo } from '@/components/SVGComponents/Logo';
import { LogoMobile } from '@/components/SVGComponents/LogoMobile';
import { AddTaskMobile } from '@/components/SVGComponents/AddTaskMobile';
import { KebabMenuIcon } from '@/components/SVGComponents/KebabMenuIcon';

const NavSkeleton = () => {
	const { width } = useWindowDimensions();
	const isMobile = width < 768;
	return (
		<>
			<div className="bg-white dark:bg-dark-grey flex items-center justify-between h-16 px-4 sticky inset-0 z-40">
				<div className="flex items-center gap-4 tablet:gap-6 h-full">
					{isMobile ? <LogoMobile /> : <Logo />}
					<div className="hidden tablet:inline-block h-full tablet:border-r border-lines-light dark:border-lines-dark"></div>
					{isMobile ? (
						<div className="flex items-center gap-2">
							<Skeleton
								classes={'bg-medium-grey h-5 rounded-full w-44 animate-pulse'}
							/>
							<ChevronUp />
						</div>
					) : (
						<span className={'text-l-heading dark:text-white'}>
							<Skeleton
								classes={'bg-medium-grey h-5 rounded-full w-52 animate-pulse'}
							/>
						</span>
					)}
				</div>
				<div className="flex items-center gap-4">
					<Button
						svgComponent={<AddTaskMobile />}
						buttonClass={
							'bg-purple py-2.5 px-5 rounded-full text-white tablet:text-m-heading'
						}
						buttonText={'+ Add New Task'}
					/>
					<div className="cursor-pointer">
						<KebabMenuIcon />
					</div>
				</div>
			</div>
		</>
	);
};

export { NavSkeleton };
