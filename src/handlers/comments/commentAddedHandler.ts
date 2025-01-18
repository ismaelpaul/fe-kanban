import { SingleComment } from '@/interfaces/IComments';
import { QueryClient } from '@tanstack/react-query';

type CommentAddedHandler = {
	type: string;
	comment: SingleComment;
};

export const commentAddedHandler = (
	data: CommentAddedHandler,
	queryClient: QueryClient
) => {
	const taskId = data.comment.task_id;

	queryClient.invalidateQueries(['comments', taskId]);
};
