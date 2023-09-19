import { useRef } from 'react';
import { getSubtasksByTaskId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import { ISubtasks, SingleSubtask } from '../../interfaces/ISubtask';
import { SingleTask } from '../../interfaces/ITask';
import Dropdown from '../Dropdown/Dropdown';
import CheckIcon from '../SVGComponents/CheckIcon';
import KebabMenu from '../SVGComponents/KebabMenu';
import useClickOutside from '../../hooks/useClickOutside';

interface TaskModalProps {
	task: SingleTask;
	setIsOpen: (arg: boolean) => void;
}

const TaskModal = ({ task, setIsOpen }: TaskModalProps) => {
	const { data, isLoading, isError } = useFetch({
		queryKey: 'subtasks',
		queryFn: () => getSubtasksByTaskId(task.task_id),
	});

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsOpen(false));

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const { subtasks }: ISubtasks = data || { subtasks: [] };

	const totalSubtasks = subtasks.length;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="bg-white p-6 rounded-md z-50 mx-4" ref={modalRef}>
				<div className="flex items-center gap-4">
					<h1 className="text-l-heading">{task.title}</h1>
					<KebabMenu />
				</div>
				<p className="text-l-body text-medium-grey mt-6">{task.description}</p>
				<span className="text-12px text-medium-grey font-bold inline-block mt-6 mb-2">
					Subtasks (0 of {totalSubtasks})
				</span>
				{subtasks.map((subtask: SingleSubtask) => {
					return (
						<div
							key={subtask.subtask_id}
							className="flex items-center bg-lines-light p-3 mt-2 rounded gap-4"
						>
							<input
								type="checkbox"
								id={subtask.subtask_id.toString()}
								className="relative peer appearance-none w-4 h-4 bg-white border border-medium-grey border-opacity-25 rounded-sm checked:bg-purple checked:border-0"
							/>
							<label
								htmlFor={subtask.subtask_id.toString()}
								className="text-12px font-bold peer-checked:opacity-50 peer-checked:line-through"
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
				})}
				<div className="mt-6">
					<span className="text-12px text-medium-grey font-bold">
						Current Status
					</span>
					<Dropdown />
				</div>
			</div>
		</div>
	);
};

export default TaskModal;
