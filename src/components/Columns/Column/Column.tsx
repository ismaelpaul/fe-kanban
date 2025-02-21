import { SingleColumn } from '@/interfaces/IColumn';

import { useTasksStore } from '@/store/tasks';

import { ColumnHeader } from '../ColumnHeader';
import { TaskList } from '@/components/Tasks/TaskList';

interface ColumnProps {
	column: SingleColumn;
	index: number;
	isDragging: boolean;
}
const Column = ({ column, index, isDragging }: ColumnProps) => {
	const { tasks } = useTasksStore();
	let dotColor;

	if (index === 0) {
		dotColor = 'bg-blue-dot';
	} else if (index === 1) {
		dotColor = 'bg-purple-dot';
	} else {
		dotColor = 'bg-green-dot';
	}

	return (
		<>
			<ColumnHeader dotColor={dotColor} column={column} tasks={tasks} />
			<div
				className={` flex flex-col items-center py-1 gap-5 w-[18rem] mb-4 overflow-y-scroll no-scrollbar h-[75vh] ${
					isDragging
						? 'bg-purple/20 border-dashed border-2 border-purple-hover rounded-md h-full'
						: ''
				}`}
			>
				<TaskList columnId={column.column_id} tasks={tasks} />
			</div>
		</>
	);
};

export { Column };
