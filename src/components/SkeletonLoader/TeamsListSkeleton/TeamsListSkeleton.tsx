import { ChevronDown } from '@/components/SVGComponents/ChevronDown';
import { Skeleton } from '../Skeleton';

const TeamsListSkeleton = () => {
	return (
		<div className="flex items-center justify-between border border-medium-grey border-opacity-25 px-4 py-3 gap-2 rounded ">
			<Skeleton classes="bg-medium-grey h-5 rounded-full w-28 animate-pulse" />
			<ChevronDown />
		</div>
	);
};

export { TeamsListSkeleton };
