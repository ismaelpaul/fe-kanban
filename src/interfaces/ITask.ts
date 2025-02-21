import { SingleSubtask, SubtaskInput } from './ISubtask';

export interface SingleTask {
	column_id: number;
	task_id: number;
	description: string;
	status: string;
	title: string;
	is_completed: boolean;
	position: number;
	subtasks: SingleSubtask[];
}

export interface ITasks {
	tasks: SingleTask[];
}

export interface TaskSubmit {
	task_id?: number;
	column_id: number;
	title: string;
	description: string;
	status: string;
	position?: number;
	subtasks: SubtaskInput[];
}

export interface TaskStatusDropdown {
	id: number;
	label: string;
	value: string;
}

export interface UpdatedTaskStatus {
	prevStatus: string | undefined;
	newStatus: string;
	newColumnId: number;
	taskId: number;
}

export interface TaskCompletionPayload {
	task_id: number;
	is_completed: boolean;
}

export interface TasksStoreState {
	tasks: { [columnId: number]: SingleTask[] };
}

export interface TasksStoreActions {
	setTasks: (columnId: number, newTasks: SingleTask[]) => void;
}
