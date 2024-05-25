import { SingleTask } from './ITask';

export interface TasksStoreState {
	tasks: { [columnId: number]: SingleTask[] };
}

export interface TasksStoreActions {
	setTasks: (columnId: number, newTasks: SingleTask[]) => void;
}
