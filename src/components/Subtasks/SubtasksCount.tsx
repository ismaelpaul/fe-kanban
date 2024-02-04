import { useEffect } from 'react';
import { SingleSubtask } from '../../interfaces/ISubtask';

type SubtasksCountProps = {
	totalSubtasks: number;
	setTotalSubtasks: (arg: number) => void;
	setCompletedSubtasks: (arg: number) => void;
	completedSubtasks: number;
	subtasks: SingleSubtask[];
};
const SubtasksCount = ({
	totalSubtasks,
	setTotalSubtasks,
	setCompletedSubtasks,
	completedSubtasks,
	subtasks,
}: SubtasksCountProps) => {
	useEffect(() => {
		if (subtasks) {
			const completedSubtasks = subtasks.filter(
				(subtask: SingleSubtask) => subtask.is_completed
			);
			setTotalSubtasks(subtasks.length);
			setCompletedSubtasks(completedSubtasks.length);
		}
	}, [subtasks, setCompletedSubtasks, setTotalSubtasks]);

	return (
		<span className="text-body font-bold text-medium-grey">
			{completedSubtasks} of {totalSubtasks} subtasks
		</span>
	);
};

export default SubtasksCount;
