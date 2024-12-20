import { SingleColumn } from '@/interfaces/IColumn';
import { SingleTask } from '@/interfaces/ITask';

interface ColumnHeaderPros {
	dotColor: string;
	column: SingleColumn;
	tasks: { [columnId: number]: SingleTask[] };
}

const ColumnHeader = ({ dotColor, column, tasks }: ColumnHeaderPros) => {
	const tasksCount = (tasks[column.column_id] || []).length;

	return (
		<div className="flex gap-3 items-center mb-7">
			<div
				className={` ${dotColor} w-[0.938rem] h-[0.938rem] rounded-full`}
			></div>
			<h1 className="text-s-heading text-medium-grey tracking-2.4px">
				{column.name.toUpperCase()} ({tasksCount})
			</h1>
		</div>
	);
};

export { ColumnHeader };
