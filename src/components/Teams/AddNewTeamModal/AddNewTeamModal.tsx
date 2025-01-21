import { motion } from 'framer-motion';
import { Overlay } from '@/components/Overlay';
import { useClickOutside } from '@/hooks';
import { useModalStore } from '@/store/modals';
import { useRef } from 'react';
import { ModalHeader } from '@/components/ModalHeader/ModalHeader';
import { TeamForm } from '../TeamForm';
import { Button } from '@/components/Button';

const AddNewTeamModal = () => {
	const { closeModal } = useModalStore();

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => closeModal('addNewTeamModal'));
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
				<ModalHeader title={'Create New Team'} />
				<TeamForm isNewTeam={true} />
				<p className="text-body text-medium-grey dark:text-white mb-6">
					A new Board will be added by default
				</p>
				<Button
					form={'team-form'}
					type="submit"
					buttonClass={
						'bg-purple text-white text-13px font-bold py-2 w-full rounded-full'
					}
					buttonText={'Create New Team'}
				/>
			</motion.dialog>
		</Overlay>
	);
};

export { AddNewTeamModal };
