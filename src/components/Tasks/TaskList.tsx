import React, { useEffect } from 'react';
import { getTasksByColumnId } from '../../api/kanbanApi';
import useFetch from '../../hooks/useFetch';
import Task from './Task';
import { ITasks, SingleTask } from '../../interfaces/ITask';
import CardSkeleton from '../SkeletonLoader/CardSkeleton';
import useTasksStore from '../../store/tasksStore';

interface TaskListProps {
	columnId: number;
	tasks: { [columnId: number]: SingleTask[] };
}

const TaskList = ({ columnId, tasks }: TaskListProps) => {
	const { setTasks } = useTasksStore();
	const { data, isLoading, isError } = useFetch({
		queryKey: ['tasks', columnId],
		queryFn: () => getTasksByColumnId(columnId),
	});

	useEffect(() => {
		if (!isLoading && !isError && data) {
			const { tasks: newTasks }: ITasks = data;
			setTasks(columnId, newTasks);
		}
	}, [data, isLoading, isError, columnId]);

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
