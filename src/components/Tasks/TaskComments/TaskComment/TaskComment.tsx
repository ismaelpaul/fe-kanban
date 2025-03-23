import { SingleComment } from '@/interfaces/IComments';

import moment from 'moment';

type TaskCommentProps = {
	comment: SingleComment;
};

const TaskComment = ({ comment }: TaskCommentProps) => {
	const commentDate = moment(comment.created_at).format(
		'MMMM DD, YYYY, h:mm A'
	);

	const userFullName = `${comment.first_name} ${comment.last_name}`;

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		e.currentTarget.src = 'https://i.ibb.co/4pDNDk1/avatar.png';
	};

	return (
		<div className="flex items-center gap-2 text-body my-2">
			<img
				className="rounded-full h-8 w-8 laptop:h-10 laptop:w-10"
				src={comment.avatar}
				alt="Commentor profile image"
				onError={handleImageError}
			/>
			<div className="w-full">
				<div className="flex gap-2 font-bold text-medium-grey">
					<span>{userFullName}</span>
					<span>{commentDate}</span>
				</div>
				<p className="text-l-body dark:text-medium-grey">{comment.comment}</p>
			</div>
		</div>
	);
};

export { TaskComment };
