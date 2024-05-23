import { ReactNode } from 'react';
import Skeleton from './Skeleton';

type ColumnSkeletonPros = {
	color: string;
	children: ReactNode[];
};

const ColumnSkeleton = ({ color, children }: ColumnSkeletonPros) => (
	<div className="flex flex-col gap-3 mb-7">
		<div className="flex items-center gap-3">
			<div
				className={`bg-${color}-dot w-[0.938rem] h-[0.938rem] rounded-full`}
			></div>
			<h1 className="text-s-heading text-medium-grey tracking-2.4px">
				<Skeleton classes={'bg-medium-grey h-5 rounded-full w-36 '} />
			</h1>
		</div>
		{children}
	</div>
);

export default ColumnSkeleton;
