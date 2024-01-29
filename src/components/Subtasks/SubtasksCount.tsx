import { useEffect } from 'react';
import { SingleSubtask } from '../../interfaces/ISubtask';
import useFetchSubtasks from '../../hooks/useFetchSubtasks';

type SubtasksCountProps = {
	taskId: number;
	totalSubtasks: number;
	setTotalSubtasks: (arg: number) => void;
	setCompletedSubtasks: (arg: number) => void;
	completedSubtasks: number;
};
const SubtasksCount = ({
	taskId,
	totalSubtasks,
	setTotalSubtasks,
	setCompletedSubtasks,
	completedSubtasks,
}: SubtasksCountProps) => {
	const { subtasks, isLoading, isError } = useFetchSubtasks(taskId);

	useEffect(() => {
		if (!isLoading && !isError) {
			const completedSubtasks = subtasks.filter(
				(subtask: SingleSubtask) => subtask.is_completed === true
			);
			setTotalSubtasks(subtasks.length);
			setCompletedSubtasks(completedSubtasks.length);
		}
	}, [isLoading, isError, subtasks]);

	return (
		<span className="text-body font-bold text-medium-grey">
			{completedSubtasks} of {totalSubtasks} subtasks
		</span>
	);
};

export default SubtasksCount;
