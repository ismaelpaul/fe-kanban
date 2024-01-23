export const getNewItemsToAdd = <T extends { is_new?: boolean }>(
	newObj: T[]
): T[] => {
	const newItemsToAdd = newObj.filter((el) => el.is_new);

	return newItemsToAdd;
};
