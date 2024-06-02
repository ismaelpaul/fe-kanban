import React, { useEffect } from 'react';
import { getTasksByColumnId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import Task from './Task';
import { ITasks, SingleTask } from '../../interfaces/ITask';
import CardSkeleton from '../SkeletonLoader/CardSkeleton';

interface TaskListProps {
	columnId: number;
	tasks: { [columnId: number]: SingleTask[] }; // Updated type
	setTasks: (columnId: number, newTasks: SingleTask[]) => void;
}
const TaskList = ({ columnId, tasks, setTasks }: TaskListProps) => {
	const { data, isLoading, isError } = useFetch({
		queryKey: ['tasks', columnId],
		queryFn: () => getTasksByColumnId(columnId),
	});

	useEffect(() => {
		if (!isLoading && !isError && data) {
			const { tasks: newTasks }: ITasks = data;
			setTasks(columnId, newTasks);
		}
	}, [data, isLoading, isError, setTasks, columnId]);

	if (isError) {
		return <span>Error: </span>;
	}

	return (
		<>
			{isLoading && <CardSkeleton />}
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
