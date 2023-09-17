import { SingleTask } from '../../interfaces/ITask';
import Card from '../Card/Card';

interface TaskPros {
	task: SingleTask;
}
const Task = ({ task }: TaskPros) => {
	const cardClass =
		'bg-white drop-shadow-card w-[17.5rem] px-4 py-6 rounded-lg';

	return (
		<>
			<Card cardClass={cardClass}>
				<div>
					<h2 className="text-m-heading">{task.title}</h2>
					<span className="text-body font-bold text-medium-grey">
						0 of 3 subtasks
					</span>
				</div>
			</Card>
		</>
	);
};

export default Task;
