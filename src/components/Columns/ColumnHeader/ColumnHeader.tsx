import { Button } from '@/components/Button';

import { SingleColumn } from '@/interfaces/IColumn';
import { SingleTask } from '@/interfaces/ITask';
import { useModalStore } from '@/store/modals';

interface ColumnHeaderPros {
	dotColor: string;
	column: SingleColumn;
	tasks: { [columnId: number]: SingleTask[] };
}

const ColumnHeader = ({ dotColor, column, tasks }: ColumnHeaderPros) => {
	const { openModal } = useModalStore();
	const tasksCount = (tasks[column.column_id] || []).length;

	const openAddNewTaskModal = () => openModal('addNewTaskModal');

	return (
		<div className="flex gap-3 items-center justify-between mb-6">
			<div className="flex items-center gap-2">
				<div
					className={` ${dotColor} w-[0.938rem] h-[0.938rem] rounded-full`}
				></div>
				<h1 className="text-s-heading text-medium-grey leading-tight tracking-2.4px">
					{column.name.toUpperCase()} ({tasksCount})
				</h1>
			</div>
			<Button
				title={'Add Task'}
				buttonClass={
					'flex items-center justify-center text-m-heading text-medium-grey hover:text-black dark:hover:text-white'
				}
				buttonText={'+'}
				onClick={openAddNewTaskModal}
			/>
		</div>
	);
};

export { ColumnHeader };
