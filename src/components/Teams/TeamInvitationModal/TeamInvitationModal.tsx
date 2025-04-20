import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { motion } from 'framer-motion';

import { inviteUserToTeam } from '@/api/kanbanApi';

import { useModalStore } from '@/store/modals';
import { useTeamsStore } from '@/store/teams';

import { useClickOutside, useToast } from '@/hooks';

import { TeamInvitationSubmit } from '@/interfaces/ITeams';

import { TeamInvitationsSchema } from '@/models/Teams';

import { ModalHeader } from '@/components/ModalHeader/ModalHeader';
import { Overlay } from '@/components/Overlay';
import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';

const TeamInvitationModal = () => {
	const [isLoading, setIsLoading] = useState(false);

	const toast = useToast();

	const { closeModal } = useModalStore();

	const selectedTeam = useTeamsStore((state) => state.selectedTeam);

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('teamInvitationModal'));

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TeamInvitationSubmit>({
		resolver: zodResolver(TeamInvitationsSchema),
	});

	const submitData: SubmitHandler<TeamInvitationSubmit> = async (data) => {
		if (!selectedTeam.team_id) return;

		const teamId = selectedTeam.team_id;

		setIsLoading(true);

		try {
			await inviteUserToTeam(teamId, data.email);

			toast.success('User invited successfully');
			reset();
		} catch (error: unknown) {
			let errorMessage = 'An unexpected error occurred';
			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
			closeModal('teamInvitationModal');
		}

		reset();
	};

	const onSubmit = handleSubmit(submitData);

	return (
		<Overlay>
			<motion.dialog
				aria-modal="true"
				open
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-auto w-screen tablet:w-[30rem]"
				ref={modalRef}
				role="dialog"
				aria-labelledby="modal-heading"
			>
				<ModalHeader title={`Invite user to ${selectedTeam?.name} `} />
				<form id="team-invite-form" onSubmit={onSubmit}>
					<InputField
						register={register}
						name="email"
						label="Email"
						placeholder="e.g. user@user.com"
						errors={errors.email}
						type="email"
					/>
				</form>
				<Button
					form={'team-invite-form'}
					type="submit"
					buttonClass={
						'bg-purple text-white text-13px font-bold py-2 w-full rounded-full'
					}
					buttonText={isLoading ? 'Sending...' : 'Invite user'}
					disabled={isLoading}
				/>
			</motion.dialog>
		</Overlay>
	);
};

export { TeamInvitationModal };
