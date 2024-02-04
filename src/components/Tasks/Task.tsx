import { useState } from 'react';
import { SingleTask } from '../../interfaces/ITask';
import Card from '../Card/Card';
import TaskModal from './TaskModal';
import { Draggable } from 'react-beautiful-dnd';
import EditTaskModal from './EditTaskModal';
import useFetchSubtasks from '../../hooks/useFetchSubtasks';
import SubtasksCount from '../Subtasks/SubtasksCount';

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

	const { subtasks, isLoading, isError } = useFetchSubtasks(task.task_id);

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

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

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
								<SubtasksCount
									totalSubtasks={totalSubtasks}
									setTotalSubtasks={setTotalSubtasks}
									setCompletedSubtasks={setCompletedSubtasks}
									completedSubtasks={completedSubtasks}
									subtasks={subtasks}
								/>
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
