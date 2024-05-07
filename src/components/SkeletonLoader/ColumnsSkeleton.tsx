import CardSkeleton from './CardSkeleton';
import Skeleton from './Skeleton';

const ColumnsSkeleton = () => {
	return (
		<div className="flex h-screen w-screen bg-light-grey dark:bg-dark-bg gap-6 p-6">
			<div className="flex flex-col gap-3 mb-7">
				<div className="flex items-center gap-3">
					<div
						className={' bg-blue-dot w-[0.938rem] h-[0.938rem] rounded-full'}
					></div>
					<h1 className="text-s-heading text-medium-grey tracking-2.4px">
						<Skeleton classes={'bg-medium-grey h-5 rounded-full w-36 '} />
					</h1>
				</div>
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
			</div>
			<div className="flex flex-col gap-3 mb-7">
				<div className="flex items-center gap-3">
					<div
						className={' bg-purple-dot w-[0.938rem] h-[0.938rem] rounded-full'}
					></div>
					<h1 className="text-s-heading text-medium-grey tracking-2.4px">
						<Skeleton classes={'bg-medium-grey h-5 rounded-full w-36 '} />
					</h1>
				</div>
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
			</div>
			<div className="flex flex-col gap-3 mb-7">
				<div className="flex items-center gap-3">
					<div
						className={' bg-green-dot w-[0.938rem] h-[0.938rem] rounded-full'}
					></div>
					<h1 className="text-s-heading text-medium-grey tracking-2.4px">
						<Skeleton classes={'bg-medium-grey h-5 rounded-full w-36 '} />
					</h1>
				</div>
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
			</div>
			<div className="bg-gradient-to-b from-linear to-linear-50 dark:from-dark-grey dark:to-dark-grey-50 w-[17.5rem] flex items-center rounded-md mt-12">
				<span className="text-l-heading block w-[17.5rem] text-medium-grey text-center cursor-pointer transition ease-in-out duration-300 hover:text-purple">
					+ New Column
				</span>
			</div>
		</div>
	);
};

export default ColumnsSkeleton;
