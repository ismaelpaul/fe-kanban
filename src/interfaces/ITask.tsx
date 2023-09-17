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
