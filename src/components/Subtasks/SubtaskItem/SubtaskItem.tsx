import { SingleSubtask } from '@/interfaces/ISubtask';

import { CheckIcon } from '@/components/SVGComponents/CheckIcon';
import { useWebSocket } from '@/hooks';
import { useSubtasksStore } from '@/store/subtasks';
import { useState } from 'react';

type SubtaskItemProps = {
	subtask: SingleSubtask;
};

const SubtaskItem = ({ subtask }: SubtaskItemProps) => {
	const [isCompleted, setIsCompleted] = useState(subtask.is_completed);
	const { sendMessage } = useWebSocket();

	const taskId = subtask.task_id;

	const subtasksStore = useSubtasksStore.getState();
	const setCompletedSubtasks = subtasksStore.setCompletedSubtasks;
	const currentCompletedSubtasks = subtasksStore.completedSubtasks[taskId];

	const handleSubtaskToggle = async (
		subtaskId: number,
		isSubtaskCompleted: boolean
	) => {
		const payload = {
			type: 'UPDATE_SUBTASK_COMPLETION',
			payload: {
				subtask_id: subtaskId,
				is_completed: !isSubtaskCompleted,
			},
		};

		setIsCompleted(!isSubtaskCompleted);

		const subtaskMarkedAsCompleted = payload.payload.is_completed === true;

		subtaskMarkedAsCompleted
			? setCompletedSubtasks(taskId, currentCompletedSubtasks + 1)
			: setCompletedSubtasks(taskId, currentCompletedSubtasks - 1);

		sendMessage(payload.type, payload.payload);
	};

	return (
		<div
			key={subtask.subtask_id}
			className="flex items-center bg-lines-light dark:bg-dark-bg p-3 mt-2 rounded gap-4 transition ease-in-out duration-200 hover:bg-purple/25"
		>
			<input
				type="checkbox"
				id={subtask.subtask_id.toString()}
				checked={isCompleted}
				onChange={() => {
					handleSubtaskToggle(subtask.subtask_id, isCompleted);
				}}
				className="relative peer appearance-none w-4 h-4 bg-white border border-medium-grey border-opacity-25 rounded-sm checked:bg-purple checked:border-0 cursor-pointer"
			/>
			<label
				htmlFor={subtask.subtask_id.toString()}
				className="text-12px dark:text-white font-bold peer-checked:opacity-50 peer-checked:line-through cursor-pointer"
			>
				{subtask.title}
			</label>
			<CheckIcon
				className={
					'absolute w-4 h-4 mt-2 ml-[3px] hidden peer-checked:block pointer-events-none'
				}
			/>
		</div>
	);
};

export { SubtaskItem };
