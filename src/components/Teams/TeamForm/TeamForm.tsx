import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { addNewTeam } from '@/api/kanbanApi';

import { TeamSubmit } from '@/interfaces/ITeams';

import { TeamNameSchema } from '@/models/Teams';

import { useModalStore } from '@/store/modals';

import { useWebSocket } from '@/hooks';

import { InputField } from '@/components/InputField';

type TeamFormProps = {
	isNewTeam?: boolean;
	selectedTeam?: TeamSubmit;
};

const TeamForm = ({ selectedTeam, isNewTeam }: TeamFormProps) => {
	const { closeModal } = useModalStore();

	const { sendMessage } = useWebSocket();

	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TeamSubmit>({
		resolver: zodResolver(TeamNameSchema),
	});

	const submitData: SubmitHandler<TeamSubmit> = async (newTeamData) => {
		if (isNewTeam) {
			await addNewTeam(newTeamData);

			closeModal('addNewTeamModal');

			queryClient.invalidateQueries(['teams']);

			reset();
		} else {
			const payload = {
				type: 'UPDATE_TEAM',
				payload: {
					team: { team_id: selectedTeam?.team_id, ...newTeamData },
				},
			};

			sendMessage(payload.type, payload.payload);

			closeModal('editTeamModal');

			reset();
		}
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<form id="team-form" onSubmit={onSubmit}>
			<InputField
				register={register}
				name="name"
				label="Team name"
				placeholder="e.g. Development Team"
				defaultValue={selectedTeam?.name}
				errors={errors.name}
				type="text"
			/>
		</form>
	);
};

export { TeamForm };
