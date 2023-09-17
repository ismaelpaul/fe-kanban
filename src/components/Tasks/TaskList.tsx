import React from 'react';
import { getTasksByColumnId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import Task from './Task';
import { ITasks } from '../../interfaces/ITask';

interface TaskListProps {
	columnId: number;
}
const TaskList = ({ columnId }: TaskListProps) => {
	console.log(columnId, '<<<< colum id taskslist');

	const { data, isLoading, isError } = useFetch({
		queryKey: ['tasks', columnId],
		queryFn: () => getTasksByColumnId(columnId),
	});

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
					<React.Fragment>
						<Task task={task} />
					</React.Fragment>
				);
			})}
		</>
	);
};

export default TaskList;
