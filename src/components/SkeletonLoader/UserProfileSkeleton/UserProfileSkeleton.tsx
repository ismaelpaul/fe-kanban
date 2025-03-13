import { ChevronDown } from '@/components/SVGComponents/ChevronDown';
import { Skeleton } from '../Skeleton';

const UserProfileSkeleton = () => {
	return (
		<>
			<div className="flex items-center gap-2">
				<div className="ml-auto">
					<Skeleton
						classes={
							'bg-medium-grey rounded-full h-8 w-8 tablet:h-10 tablet:w-10 laptop:h-12 laptop:w-12 animate-pulse'
						}
					/>
				</div>
				<Skeleton
					classes={'bg-medium-grey h-5 rounded-full w-24 animate-pulse'}
				/>
				<ChevronDown />
			</div>
		</>
	);
};

export { UserProfileSkeleton };
