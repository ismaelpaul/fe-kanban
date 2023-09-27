import { useRef, useState } from 'react';
import Button from '../Button/Button';
import useClickOutside from '../../hooks/useClickOutside';
import Cross from '../SVGComponents/Cross';

interface AddNewBoardModalProps {
	setIsAddNewBoardModalOpen: (arg: boolean) => void;
}
const AddNewBoardModal = ({
	setIsAddNewBoardModalOpen,
}: AddNewBoardModalProps) => {
	const [columnsInput, setColumnsInput] = useState([
		{ id: 1, placeholder: 'e.g. Todo' },
		{ id: 2, placeholder: 'e.g. Doing' },
	]);

	const addInputField = () => {
		const newInputFields = [...columnsInput];
		const newId = newInputFields.length + 1;
		newInputFields.push({ id: newId, placeholder: 'e.g. New Column' });
		setColumnsInput(newInputFields);
	};

	const removeInputField = (idxToRemove: number) => {
		const updatedInputs = columnsInput.filter((_, idx) => idx !== idxToRemove);
		setColumnsInput(updatedInputs);
	};

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsAddNewBoardModalOpen(false));

	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey border border-medium-grey border-opacity-25 rounded px-4 py-2 text-l-body w-full';

	const btnAddColumnClass =
		'bg-purple bg-opacity-10 dark:bg-white dark:bg-opacity-100 text-purple text-13px font-bold py-2 w-full rounded-full';
	const btnAddColumnText = '+ Add New Column';

	const btnAddNewBoardClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full mt-6';
	const btnAddNewBoardText = 'Create New Board';

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen"
				ref={modalRef}
			>
				<form>
					<h1 className="text-l-heading mb-6 dark:text-white">Add New Board</h1>
					<div className="flex flex-col gap-2 mb-6">
						<label className={labelClass}>Board Name</label>
						<input className={inputClass} placeholder="e.g. Web Design" />
					</div>
					<label className={`${labelClass} inline-block mb-2`}>
						Board Columns
					</label>
					{columnsInput.map((input, idx) => {
						return (
							<div key={idx} className="flex items-center gap-4 mb-3">
								<input className={inputClass} placeholder={input.placeholder} />
								<div onClick={() => removeInputField(idx)}>
									<Cross />
								</div>
							</div>
						);
					})}
					<Button
						buttonClass={btnAddColumnClass}
						buttonText={btnAddColumnText}
						onClick={addInputField}
						type="button"
					/>
				</form>
				<Button
					buttonClass={btnAddNewBoardClass}
					buttonText={btnAddNewBoardText}
				/>
			</div>
		</div>
	);
};

export default AddNewBoardModal;
