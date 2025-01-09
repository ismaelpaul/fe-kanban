import { Button } from '@/components/Button';
type TaskActionsProps = {
	isTaskCompleted: boolean;
	onToggleCompletion: () => void;
};
const TaskActions = ({
	isTaskCompleted,
	onToggleCompletion,
}: TaskActionsProps) => {
	return (
		<>
			<Button
				buttonText={isTaskCompleted ? 'Mark Incomplete' : 'Mark Complete'}
				buttonClass={`${
					isTaskCompleted
						? 'bg-task-completion text-white dark:bg-dark-task-completion dark:text-lines-dark'
						: 'text-task-completion dark:text-dark-task-completion'
				} text-12px border rounded border-task-completion dark:border-dark-task-completion p-1 mt-6`}
				onClick={onToggleCompletion}
			/>
		</>
	);
};

export { TaskActions };
