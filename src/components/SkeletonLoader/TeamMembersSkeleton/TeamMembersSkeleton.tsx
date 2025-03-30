import { Skeleton } from '../Skeleton';

const TeamMembersSkeleton = () => {
	return (
		<div className="flex">
			<div
				className={
					'relative bg-medium-grey  h-8 w-8 tablet:h-10 tablet:w-10 laptop:h-12 laptop:w-12 overflow-hidden rounded-full border-2 border-white dark:border-dark-grey z-50 animate-pulse'
				}
			>
				<Skeleton classes="h-full w-full object-cover" />
			</div>
			<div
				className={`relative bg-medium-grey h-8 w-8 tablet:h-10 tablet:w-10 laptop:h-12 laptop:w-12 overflow-hidden rounded-full border-2 border-white dark:border-dark-grey -ml-4 tablet:-ml-3 animate-pulse z-40`}
			>
				<Skeleton classes="h-full w-full object-cover" />
			</div>
			<div
				className={`relative bg-medium-grey h-8 w-8 tablet:h-10 tablet:w-10 laptop:h-12 laptop:w-12 overflow-hidden rounded-full border-2 border-white dark:border-dark-grey -ml-4 tablet:-ml-3 animate-pulse`}
			>
				<Skeleton classes="h-full w-full object-cover" />
			</div>
		</div>
	);
};

export { TeamMembersSkeleton };
