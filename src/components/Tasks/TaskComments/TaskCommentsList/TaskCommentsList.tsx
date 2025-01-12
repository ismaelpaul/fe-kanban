import React from 'react';

import { TaskComment } from '../TaskComment/TaskComment';
import { useFetchTaskComments } from '@/hooks/useFetchTaskComments';
import { SingleComment } from '@/interfaces/IComments';

type TaskCommentsListProps = {
	taskId: number;
};

const TaskCommentsList = ({ taskId }: TaskCommentsListProps) => {
	const { comments, isLoading } = useFetchTaskComments(taskId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (comments.length == 0) {
		return null;
	}

	return (
		<div className="my-5">
			{comments.map((comment: SingleComment) => {
				return (
					<React.Fragment key={comment.comment_id}>
						<TaskComment comment={comment} />
					</React.Fragment>
				);
			})}
		</div>
	);
};

export { TaskCommentsList };
