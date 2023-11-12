import { create } from 'zustand';
import { TasksStoreActions, TasksStoreState } from '../interfaces/ITasksStore';

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

export default useTasksStore;
