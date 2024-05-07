import { SingleColumn } from '../../interfaces/IColumn';

interface ColumnHeaderPros {
	dotColor: string;
	tasksLength: number;
	column: SingleColumn;
}

const ColumnHeader = ({ dotColor, tasksLength, column }: ColumnHeaderPros) => {
	return (
		<div className="flex gap-3 items-center mb-7">
			<div
				className={` ${dotColor} w-[0.938rem] h-[0.938rem] rounded-full`}
			></div>
			<h1 className="text-s-heading text-medium-grey tracking-2.4px">
				{column.name.toUpperCase()} ({tasksLength})
			</h1>
		</div>
	);
};

export default ColumnHeader;
