import { SingleSubtask } from '@/interfaces/ISubtask';

import { CheckIcon } from '@/components/SVGComponents/CheckIcon';

type SubtaskItemProps = {
	subtask: SingleSubtask;
	handleSubtaskToggle: (subtaskId: number, isCompleted: boolean) => void;
};

const SubtaskItem = ({ subtask, handleSubtaskToggle }: SubtaskItemProps) => {
	const isCompleted = subtask.is_completed === true;
	return (
		<div
			key={subtask.subtask_id}
			className="flex items-center bg-lines-light dark:bg-dark-bg p-3 mt-2 rounded gap-4 transition ease-in-out duration-200 hover:bg-purple/25"
		>
			<input
				type="checkbox"
				id={subtask.subtask_id.toString()}
				defaultChecked={isCompleted}
				onChange={() => {
					handleSubtaskToggle(subtask.subtask_id, subtask.is_completed);
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
