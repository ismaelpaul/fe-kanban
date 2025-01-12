export interface SingleComment {
	comment_id: number;
	comment: string;
	created_at: string;
	user_id: number;
	avatar: string;
	first_name: string;
	last_name: string;
}

export interface CommentSubmit {
	comment: string;
	task_id: number;
	user_id: number;
}

export interface IComments {
	comments: SingleComment[];
}
