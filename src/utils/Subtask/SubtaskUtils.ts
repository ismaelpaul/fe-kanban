import { updateSubtaskCompletionById } from '../../api/kanbanApi';
import usePatch from '../../hooks/usePatch';

export const handleSubtaskCompletion = async (
	subtaskId: number,
	isCompleted: boolean,
	updatingSubtask: number | null,
	completedSubtasks: number,
	setUpdatingSubtask: (arg: number | null) => void,
	setCompletedSubtasks: (arg: number) => void,
	patch: ReturnType<typeof usePatch>['patch']
) => {
	if (updatingSubtask === subtaskId) {
		isCompleted = !isCompleted;

		const newCompleted = isCompleted
			? completedSubtasks + 1
			: completedSubtasks - 1;

		setCompletedSubtasks(newCompleted);
		setUpdatingSubtask(null);
	} else {
		setUpdatingSubtask(subtaskId);
	}

	const newCompleted = isCompleted
		? completedSubtasks - 1
		: completedSubtasks + 1;

	setCompletedSubtasks(newCompleted);

	const updatedData = {
		is_completed: !isCompleted,
	};
	const queryKey = 'subtasks';

	await patch({
		patchFn: updateSubtaskCompletionById,
		resourceId: subtaskId,
		updatedData,
		queryKey,
	});
};
