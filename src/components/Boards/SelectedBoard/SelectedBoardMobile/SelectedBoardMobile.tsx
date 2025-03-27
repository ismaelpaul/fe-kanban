import { Button } from '@/components/Button';
import { ChevronDown } from '@/components/SVGComponents/ChevronDown';
import { ChevronUp } from '@/components/SVGComponents/ChevronUp';
import { useModalStore } from '@/store/modals';
import { SelectedBoardProps } from '../SelectedBoard';

const SelectedBoardMobile = ({ selectedBoard }: SelectedBoardProps) => {
	const { modals, toggleModal } = useModalStore();
	return (
		<div className="flex items-center gap-2">
			<Button
				buttonClass={'text-black dark:text-white text-m-heading'}
				buttonText={selectedBoard.name}
				onClick={() => {
					toggleModal('sidebarNav');
				}}
			/>
			{modals.sidebarNav ? <ChevronUp /> : <ChevronDown />}
		</div>
	);
};

export { SelectedBoardMobile };
