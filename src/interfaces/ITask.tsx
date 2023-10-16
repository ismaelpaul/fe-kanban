import { SubtaskSubmit } from './ISubtask';

export interface SingleTask {
	column_id: number;
	task_id: number;
	description: string;
	status: string;
	title: string;
}

export interface ITasks {
	tasks: SingleTask[];
}

export interface TaskSubmit {
	column_id: number;
	title: string;
	description: string;
	status: string;
	subtasks: SubtaskSubmit[];
}
