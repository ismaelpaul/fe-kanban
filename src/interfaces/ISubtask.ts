export interface SingleSubtask {
	task_id: number;
	subtask_id: number;
	title: string;
	is_completed: boolean;
	created_at?: string;
	column_id?: number;
}

export interface ISubtasks {
	subtasks: SingleSubtask[];
}

export interface SubtaskSubmit {
	title: string;
	is_completed: boolean;
}

export interface SubtaskInput {
	placeholder?: string;
	task_id?: number;
	subtask_id: number;
	title: string;
	is_completed: boolean;
	is_new?: boolean;
}

export interface SubtasksStoreState {
	totalSubtasks: { [taskId: number]: number };
	completedSubtasks: { [taskId: number]: number };
}

export interface SubtasksStoreActions {
	setTotalSubtasks: (taskId: number, subtasksCount: number) => void;
	setCompletedSubtasks: (taskId: number, completedSubtasks: number) => void;
}
