import { useEffect } from 'react';

import { SingleSubtask } from '@/interfaces/ISubtask';

type SubtasksCountProps = {
	taskId: number;
	totalSubtasks: number;
	setTotalSubtasks: (taskId: number, subtasksCount: number) => void;
	setCompletedSubtasks: (taskId: number, subtasksCount: number) => void;
	completedSubtasks: number;
	subtasks: SingleSubtask[];
};
const SubtasksCount = ({
	taskId,
	totalSubtasks,
	setTotalSubtasks,
	setCompletedSubtasks,
	completedSubtasks,
	subtasks,
}: SubtasksCountProps) => {
	useEffect(() => {
		if (subtasks) {
			const completed = subtasks.filter(
				(subtask: SingleSubtask) => subtask.is_completed
			);
			setTotalSubtasks(taskId, subtasks.length);
			setCompletedSubtasks(taskId, completed.length);
		}
	}, [subtasks, setCompletedSubtasks, setTotalSubtasks, taskId]);

	return (
		<span className="text-body font-bold text-medium-grey">
			{completedSubtasks} of {totalSubtasks} subtasks
		</span>
	);
};

export { SubtasksCount };
