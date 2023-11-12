import React, { useEffect } from 'react';
import { getTasksByColumnId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import Task from './Task';
import { ITasks } from '../../interfaces/ITask';
import useTasksStore from '../../store/tasksStore';

interface TaskListProps {
	columnId: number;
	setTasksLength: (taskLenght: number) => void;
}
const TaskList = ({ columnId, setTasksLength }: TaskListProps) => {
	const { tasks, setTasks } = useTasksStore();

	const { data, isLoading, isError } = useFetch({
		queryKey: ['tasks', columnId],
		queryFn: () => getTasksByColumnId(columnId),
	});

	useEffect(() => {
		if (!isLoading && !isError && data) {
			const { tasks: newTasks }: ITasks = data;
			setTasksLength(newTasks.length);
			setTasks(columnId, newTasks);
		}
	}, [data, isLoading, isError, setTasksLength, setTasks, columnId]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	return (
		<>
			{tasks[columnId]?.map((task, index) => {
				return (
					<React.Fragment key={task.task_id}>
						<Task task={task} columnId={columnId} index={index} />
					</React.Fragment>
				);
			})}
		</>
	);
};

export default TaskList;
