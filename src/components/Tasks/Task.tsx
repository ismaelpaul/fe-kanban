import { useEffect, useState } from 'react';
import { SingleTask } from '../../interfaces/ITask';
import Card from '../Card/Card';
import TaskModal from './TaskModal';
import { getSubtasksByTaskId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import { ISubtasks, SingleSubtask } from '../../interfaces/ISubtask';
import { Draggable } from 'react-beautiful-dnd';
import EditTaskModal from './EditTaskModal';

interface TaskProps {
	task: SingleTask;
	columnId: number;
	index: number;
}
const Task = ({ task, columnId, index }: TaskProps) => {
	const [isHovering, setIsHovering] = useState(-1);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [totalSubtasks, setTotalSubtasks] = useState(0);
	const [completedSubtasks, setCompletedSubtasks] = useState(0);
	const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

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
		'bg-white dark:bg-dark-grey drop-shadow-card w-[17.5rem] px-4 py-6 rounded-lg cursor-pointer';

	const handleTaskClick = () => {
		setIsTaskModalOpen(true);
	};

	const handleMouseOver = (index: number) => {
		setIsHovering(index);
	};

	const handleMouseOut = () => {
		setIsHovering(-1);
	};

	const isCardOnHover = isHovering === index;

	return (
		<>
			<Draggable draggableId={task.task_id.toString()} index={index}>
				{(provided) => (
					<div
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						ref={provided.innerRef}
						onMouseOut={handleMouseOut}
						onMouseOver={() => {
							handleMouseOver(index);
						}}
					>
						<Card onClick={handleTaskClick} cardClass={cardClass}>
							<>
								<h2
									className={`text-m-heading transition ease-in-out duration-300  ${
										isCardOnHover
											? ' text-purple'
											: 'text-black dark:text-white'
									}`}
								>
									{task.title}
								</h2>
								<span className="text-body font-bold text-medium-grey">
									{completedSubtasks} of {totalSubtasks} subtasks
								</span>
							</>
						</Card>
					</div>
				)}
			</Draggable>
			{isTaskModalOpen ? (
				<TaskModal
					task={task}
					subtasks={subtasks}
					totalSubtasks={totalSubtasks}
					completedSubtasks={completedSubtasks}
					columnId={columnId}
					setCompletedSubtasks={setCompletedSubtasks}
					setIsTaskModalOpen={setIsTaskModalOpen}
					setIsEditTaskModalOpen={setIsEditTaskModalOpen}
				/>
			) : (
				<></>
			)}
			{isEditTaskModalOpen ? (
				<EditTaskModal
					setIsEditTaskModalOpen={setIsEditTaskModalOpen}
					task={task}
					subtasks={subtasks}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default Task;
