import { useState } from 'react';
import { SingleColumn } from '../../interfaces/IColumn';
import TaskList from '../Tasks/TaskList';

interface ColumnProps {
	column: SingleColumn;
	index: number;
}
const Column = ({ column, index }: ColumnProps) => {
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
		<div>
			<div className="flex gap-3 items-center">
				<div
					className={` ${circleColor} w-[0.938rem] h-[0.938rem] rounded-full`}
				></div>
				<h1 className="text-s-heading text-medium-grey tracking-2.4px">
					{column.name.toUpperCase()} ({tasksLength})
				</h1>
			</div>
			<div className="flex flex-col gap-5 py-8 w-[17.5rem]">
				<TaskList columnId={column.column_id} setTasksLength={setTasksLength} />
			</div>
		</div>
	);
};

export default Column;
