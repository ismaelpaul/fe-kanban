import { useRef } from 'react';
import { motion } from 'framer-motion';

import { useClickOutside } from '@/hooks';

import { useModalStore } from '@/store/modals';
import { useTeamsStore } from '@/store/teams';

import { TeamForm } from '../TeamForm';
import { Overlay } from '@/components/Overlay';
import { ModalHeader } from '@/components/ModalHeader/ModalHeader';
import { Button } from '@/components/Button';

const EditTeamModal = () => {
	const { closeModal } = useModalStore();

	const selectedTeam = useTeamsStore((state) => state.selectedTeam);

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('editTeamModal'));
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
				<ModalHeader title={'Edit Team Modal'} />
				<TeamForm selectedTeam={selectedTeam} />
				<Button
					form={'team-form'}
					type="submit"
					buttonClass={
						'bg-purple text-white text-13px font-bold py-2 w-full rounded-full'
					}
					buttonText={'Save changes'}
				/>
			</motion.dialog>
		</Overlay>
	);
};

export { EditTeamModal };
