import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useWebSocket } from '@/hooks';

import { CommentSubmit } from '@/interfaces/IComments';

import { useUserStore } from '@/store/users';

import { CommentSubmitSchema } from '@/models/Comment';

import { TextAreaInput } from '@/components/Input/TextAreaInput';

type AddNewCommentProps = {
	taskId: number;
};

const AddNewComment = ({ taskId }: AddNewCommentProps) => {
	const { sendMessage } = useWebSocket();

	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';

	const userId = useUserStore.getState().user.user_id;
	const userProfileImg = useUserStore.getState().user.avatar;

	const {
		register,
		handleSubmit,
		reset,

		formState: { errors },
	} = useForm<CommentSubmit>({
		resolver: zodResolver(CommentSubmitSchema),
	});

	const submitData: SubmitHandler<CommentSubmit> = async (newComment) => {
		const payload = {
			type: 'ADD_TASK_COMMENT',
			payload: {
				comment: newComment.comment,
				task_id: taskId,
				user_id: userId,
			},
		};

		sendMessage(payload.type, payload.payload);

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<form id="task-comment-form" onSubmit={onSubmit}>
			<div className="flex flex-col gap-2 mb-6 relative">
				<input type="hidden" {...register('task_id')} defaultValue={taskId} />
				<input type="hidden" {...register('user_id')} defaultValue={userId} />
				<div className="flex items-center gap-2">
					<img
						className="laptop:h-8 laptop:w-8"
						src={userProfileImg}
						alt="profile image"
					/>
					<TextAreaInput
						register={register}
						name={'comment'}
						className={`${inputClass} h-11 ${
							errors.comment ? 'border border-red/100' : ''
						}`}
						placeholder="e.g. I'm working on it"
					/>
				</div>
				{errors.comment && (
					<span className="text-red text-l-body absolute right-4 top-9">
						{errors.comment.message}
					</span>
				)}
			</div>
		</form>
	);
};

export { AddNewComment };
