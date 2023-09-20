import { useState } from 'react';
import { SingleTask } from '../../interfaces/ITask';
import Card from '../Card/Card';
import TaskModal from './TaskModal';

interface TaskPros {
	task: SingleTask;
}
const Task = ({ task }: TaskPros) => {
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

	const cardClass =
		'bg-white drop-shadow-card w-[17.5rem] px-4 py-6 rounded-lg';

	const handleTaskClick = () => {
		setIsTaskModalOpen(true);
	};

	return (
		<div onClick={handleTaskClick}>
			<Card cardClass={cardClass}>
				<>
					<h2 className="text-m-heading">{task.title}</h2>
					<span className="text-body font-bold text-medium-grey">
						0 of 3 subtasks
					</span>
				</>
			</Card>
			{isTaskModalOpen ? (
				<TaskModal task={task} setIsTaskModalOpen={setIsTaskModalOpen} />
			) : (
				<></>
			)}
		</div>
	);
};

export default Task;
