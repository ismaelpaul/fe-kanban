import { TasksStoreActions, TasksStoreState } from '@/interfaces/ITask';
import { create } from 'zustand';

const useTasksStore = create<TasksStoreState & TasksStoreActions>((set) => ({
	tasks: {},
	setTasks: (columnId, newTasks) =>
		set((state) => ({
			tasks: {
				...state.tasks,
				[columnId]: newTasks,
			},
		})),
}));

export { useTasksStore };
