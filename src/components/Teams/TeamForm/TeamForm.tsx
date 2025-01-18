import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { addNewTeam } from '@/api/kanbanApi';

import { TeamSubmit } from '@/interfaces/ITeams';

import { TeamNameSchema } from '@/models/Teams';

import { useModalStore } from '@/store/modals';

import { TextInput } from '@/components/Input/TextInput';

const TeamForm = () => {
	const { closeModal } = useModalStore();

	const queryClient = useQueryClient();

	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const errorClass = 'text-red text-l-body absolute ';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TeamSubmit>({
		resolver: zodResolver(TeamNameSchema),
	});

	const submitData: SubmitHandler<TeamSubmit> = async (newTeamData) => {
		await addNewTeam(newTeamData);

		closeModal('addNewTeamModal');

		queryClient.invalidateQueries(['teams']);

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<form id="team-form" onSubmit={onSubmit}>
			<div className="flex flex-col gap-2 mb-6 relative">
				<label htmlFor="name" className={labelClass}>
					Team name
				</label>
				<TextInput
					register={register}
					name="name"
					className={`${inputClass} ${
						errors.name ? 'border border-red/100' : ''
					}`}
					placeholder="e.g. Development Team"
					// defaultValue={taskData?.title}
				/>
				{errors.name && (
					<span className={`${errorClass} right-6 mt-[2.1rem]`}>
						{errors.name.message}
					</span>
				)}
			</div>
		</form>
	);
};

export { TeamForm };
