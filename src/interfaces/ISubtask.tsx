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
	subtask_title: string;
	is_completed: boolean;
}

export interface SubtaskInput {
	subtask_title: string;
}
