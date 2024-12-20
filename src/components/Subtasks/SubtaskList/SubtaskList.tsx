import { SingleSubtask } from '@/interfaces/ISubtask';
import { SubtaskItem } from '../SubtaskItem';

type SubtasksListProps = {
	completedSubtasks: number;
	totalSubtasks: number;
	subtasks: SingleSubtask[];
	handleSubtaskToggle: (subtaskId: number, isCompleted: boolean) => void;
};

const SubtasksList = ({
	completedSubtasks,
	totalSubtasks,
	subtasks,
	handleSubtaskToggle,
}: SubtasksListProps) => {
	return (
		<>
			<span className="text-12px text-medium-grey dark:text-white font-bold inline-block mt-6 mb-2">
				Subtasks ({completedSubtasks} of {totalSubtasks})
			</span>
			{subtasks.map((subtask: SingleSubtask) => (
				<SubtaskItem
					key={subtask.subtask_id}
					subtask={subtask}
					handleSubtaskToggle={handleSubtaskToggle}
				/>
			))}
		</>
	);
};

export { SubtasksList };
