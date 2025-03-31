import { Options } from '@/interfaces/IOptionsDropdown';
import { SingleSubtask } from '@/interfaces/ISubtask';

import { Dropdown } from '@/components/Dropdown/Dropdown';
import { SubtasksList } from '@/components/Subtasks/SubtasksList/SubtasksList';

type TaskDetailsProps = {
	description: string;
	subtasks: SingleSubtask[];
	completedSubtasks: number;
	totalSubtasks: number;
	selectedOption: Options;
	options: Options[];
};
const TaskDetails = ({
	description,
	subtasks,
	completedSubtasks,
	totalSubtasks,
	selectedOption,
	options,
}: TaskDetailsProps) => {
	return (
		<>
			<p className="text-l-body text-medium-grey mt-6">{description}</p>
			<SubtasksList
				completedSubtasks={completedSubtasks}
				totalSubtasks={totalSubtasks}
				subtasks={subtasks}
			/>
			<div className="flex flex-col gap-2 mt-6">
				<span className="text-12px text-medium-grey dark:text-white font-bold">
					Current Status
				</span>
				<Dropdown
					selectedOption={selectedOption}
					setSelectedOption={() => {}}
					options={options}
					disabled
				/>
			</div>
		</>
	);
};

export { TaskDetails };
