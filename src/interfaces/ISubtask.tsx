export interface SingleSubtask {
	task_id: number;
	subtask_id: number;
	title: string;
	is_completed: boolean;
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
	subtask_id?: number;
	title: string;
	is_completed: boolean;
	is_new?: boolean;
}
