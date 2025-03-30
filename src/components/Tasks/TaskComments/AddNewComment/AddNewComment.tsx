import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { useWebSocket } from '@/hooks';

import { CommentSubmit } from '@/interfaces/IComments';
import { User } from '@/interfaces/IUser';

import { CommentSubmitSchema } from '@/models/Comment';

import { TextAreaInput } from '@/components/Input/TextAreaInput';

type AddNewCommentProps = {
	taskId: number;
};

const AddNewComment = ({ taskId }: AddNewCommentProps) => {
	const { sendMessage } = useWebSocket();

	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';

	const queryClient = useQueryClient();

	const userDataCache = queryClient.getQueryData<User>(['user']);

	const user = userDataCache?.user ?? {
		user_id: 0,
		avatar: 'https://i.ibb.co/4pDNDk1/avatar.png',
		first_name: '',
		last_name: '',
		email: '',
	};

	const userId = user.user_id;
	const userProfileImg = user.avatar;

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

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		e.currentTarget.src = 'https://i.ibb.co/4pDNDk1/avatar.png';
	};

	return (
		<form id="task-comment-form" onSubmit={onSubmit}>
			<div className="flex flex-col gap-2 mb-6 relative">
				<input type="hidden" {...register('task_id')} defaultValue={taskId} />
				<input type="hidden" {...register('user_id')} defaultValue={userId} />
				<div className="flex items-center gap-2">
					<img
						className="rounded-full h-8 w-8 laptop:h-10 laptop:w-10"
						src={userProfileImg}
						alt="profile image"
						onError={handleImageError}
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
