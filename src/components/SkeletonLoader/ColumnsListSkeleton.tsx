import CardSkeleton from './CardSkeleton';
import ColumnSkeleton from './ColumnSkeleton';

const ColumnsListSkeleton = () => {
	const columnsData = [
		{ color: 'blue', numCards: 3 },
		{ color: 'purple', numCards: 2 },
		{ color: 'green', numCards: 3 },
	];

	return (
		<div className="flex h-screen w-screen bg-light-grey dark:bg-dark-bg gap-6 p-6">
			{columnsData.map(({ color, numCards }, index) => (
				<ColumnSkeleton key={index} color={color}>
					{[...Array(numCards)].map((_, cardIndex) => (
						<CardSkeleton key={cardIndex} />
					))}
				</ColumnSkeleton>
			))}
			<div className="bg-gradient-to-b from-linear to-linear-50 dark:from-dark-grey dark:to-dark-grey-50 w-[17.5rem] flex items-center rounded-md mt-12">
				<span className="text-l-heading block w-[17.5rem] text-medium-grey text-center cursor-pointer transition ease-in-out duration-300 hover:text-purple">
					+ New Column
				</span>
			</div>
		</div>
	);
};

export default ColumnsListSkeleton;
