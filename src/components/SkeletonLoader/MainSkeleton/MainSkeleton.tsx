import { ColumnsListSkeleton } from '../ColumnsListSkeleton';
import { NavSkeleton } from '../NavSkeleton';

const MainSkeleton = () => {
	return (
		<>
			<NavSkeleton />
			<ColumnsListSkeleton />
		</>
	);
};

export { MainSkeleton };
