import Card from '../Card/Card';
import Skeleton from './Skeleton';

const CardSkeleton = () => {
	const cardClass =
		'bg-white dark:bg-dark-grey drop-shadow-card w-[17.5rem] px-4 py-6 rounded-lg';
	return (
		<div>
			<Card cardClass={cardClass}>
				<>
					<Skeleton
						classes={'bg-medium-grey h-5 rounded-full mb-4 animate-pulse'}
					/>
					<Skeleton
						classes={'bg-medium-grey h-3 rounded-full mb-4 animate-pulse'}
					/>
					<Skeleton
						classes={'bg-medium-grey h-3 w-[90%] rounded-full animate-pulse'}
					/>
				</>
			</Card>
		</div>
	);
};

export default CardSkeleton;
