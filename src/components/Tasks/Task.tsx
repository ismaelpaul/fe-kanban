import { useEffect, useState } from 'react';
import { SingleTask } from '../../interfaces/ITask';
import Card from '../Card/Card';
import TaskModal from './TaskModal';
import { getSubtasksByTaskId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import { ISubtasks, SingleSubtask } from '../../interfaces/ISubtask';

interface TaskPros {
	task: SingleTask;
	columnId: number;
}
const Task = ({ task, columnId }: TaskPros) => {
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [totalSubtasks, setTotalSubtasks] = useState(0);
	const [completedSubtasks, setCompletedSubtasks] = useState(0);

	const subtaskQueryKey = `subtasks_${task.task_id}`;

	const { data, isLoading, isError } = useFetch({
		queryKey: [subtaskQueryKey],
		queryFn: () => getSubtasksByTaskId(task.task_id),
	});

	useEffect(() => {
		if (!isLoading && !isError) {
			const { subtasks } = data || { subtasks: [] };
			const completedSubtasks = subtasks.filter(
				(subtask: SingleSubtask) => subtask.is_completed === true
			);
			setTotalSubtasks(subtasks.length);
			setCompletedSubtasks(completedSubtasks.length);
		}
	}, [isLoading, isError, data]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const { subtasks }: ISubtasks = data || { subtasks: [] };

	const cardClass =
		'bg-white dark:bg-dark-grey drop-shadow-card w-[17.5rem] px-4 py-6 rounded-lg';

	const handleTaskClick = () => {
		setIsTaskModalOpen(true);
	};

	return (
		<div onClick={handleTaskClick}>
			<Card cardClass={cardClass}>
				<>
					<h2 className="text-m-heading text-black dark:text-white">
						{task.title}
					</h2>
					<span className="text-body font-bold text-medium-grey">
						{completedSubtasks} of {totalSubtasks} subtasks
					</span>
				</>
			</Card>
			{isTaskModalOpen ? (
				<TaskModal
					task={task}
					setIsTaskModalOpen={setIsTaskModalOpen}
					subtasks={subtasks}
					totalSubtasks={totalSubtasks}
					completedSubtasks={completedSubtasks}
					setCompletedSubtasks={setCompletedSubtasks}
					columnId={columnId}
				/>
			) : (
				<></>
			)}
		</div>
	);
};

export default Task;
