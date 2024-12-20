import { useState } from 'react';

type DeleteFunction = () => Promise<void>;

const useDelete = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteItem = async (deleteFunction: DeleteFunction) => {
		setIsDeleting(true);
		try {
			await deleteFunction();

			setIsDeleting(false);
		} catch (error) {
			setIsDeleting(false);
		}
	};

	return { isDeleting, deleteItem };
};

export { useDelete };
