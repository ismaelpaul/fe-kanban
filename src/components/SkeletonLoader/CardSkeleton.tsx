import Card from '../Card/Card';

const CardSkeleton = () => {
	const cardClass =
		'bg-white dark:bg-dark-grey drop-shadow-card w-[17.5rem] px-4 py-6 rounded-lg';
	return (
		<div>
			<Card cardClass={cardClass}>
				<>
					<div className="bg-medium-grey h-5 rounded-full mb-4 animate-pulse"></div>
					<div className="bg-medium-grey h-3 rounded-full mb-4 animate-pulse"></div>
					<div className="bg-medium-grey h-3 rounded-full animate-pulse"></div>
				</>
			</Card>
		</div>
	);
};

export default CardSkeleton;
