import { useState } from 'react';
import { SingleColumn } from '../../interfaces/IColumn';
import TaskList from '../Tasks/TaskList';

interface ColumnProps {
	column: SingleColumn;
	index: number;
	isDragging: boolean;
}
const Column = ({ column, index, isDragging }: ColumnProps) => {
	const [tasksLength, setTasksLength] = useState(0);
	let circleColor;

	if (index === 0) {
		circleColor = 'bg-blue-dot';
	} else if (index === 1) {
		circleColor = 'bg-purple-dot';
	} else {
		circleColor = 'bg-green-dot';
	}
	return (
		<>
			<div className="flex gap-3 items-center mb-7">
				<div
					className={` ${circleColor} w-[0.938rem] h-[0.938rem] rounded-full`}
				></div>
				<h1 className="text-s-heading text-medium-grey tracking-2.4px">
					{column.name.toUpperCase()} ({tasksLength})
				</h1>
			</div>
			<div
				className={` flex flex-col items-center py-1 gap-5 w-[18rem] mb-4 max-h-[80vh] overflow-y-scroll no-scrollbar ${
					isDragging
						? 'bg-purple/20 border-dashed border-2 border-purple-hover rounded-md h-full'
						: ''
				}`}
			>
				<TaskList columnId={column.column_id} setTasksLength={setTasksLength} />
			</div>
		</>
	);
};

export default Column;
