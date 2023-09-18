import React, { useEffect } from 'react';
import { getTasksByColumnId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import Task from './Task';
import { ITasks } from '../../interfaces/ITask';

interface TaskListProps {
	columnId: number;
	setTasksLength: (taskLenght: number) => void;
}
const TaskList = ({ columnId, setTasksLength }: TaskListProps) => {
	const { data, isLoading, isError } = useFetch({
		queryKey: ['tasks', columnId],
		queryFn: () => getTasksByColumnId(columnId),
	});

	useEffect(() => {
		if (!isLoading && !isError && data) {
			const { tasks }: ITasks = data;
			setTasksLength(tasks.length);
		}
	}, [data, isLoading, isError, setTasksLength]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: </span>;
	}

	const { tasks }: ITasks = data || { tasks: [] };

	return (
		<>
			{tasks.map((task) => {
				return (
					<React.Fragment key={task.task_id}>
						<Task task={task} />
					</React.Fragment>
				);
			})}
		</>
	);
};

export default TaskList;
