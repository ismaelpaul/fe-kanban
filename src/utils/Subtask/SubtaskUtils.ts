import { usePatch } from '@/hooks';
import { updateSubtaskCompletionById } from '../../api/kanbanApi';

export const handleSubtaskCompletion = async (
	subtaskId: number,
	isSubtaskCompleted: boolean,
	updatingSubtask: number | null,
	completedSubtasks: number,
	setUpdatingSubtask: (arg: number | null) => void,
	setCompletedSubtasks: (arg: number) => void,
	patch: ReturnType<typeof usePatch>['patch']
) => {
	if (updatingSubtask === subtaskId) {
		isSubtaskCompleted = !isSubtaskCompleted;

		const newCompleted = isSubtaskCompleted
			? completedSubtasks + 1
			: completedSubtasks - 1;

		setCompletedSubtasks(newCompleted);
		setUpdatingSubtask(null);
	} else {
		setUpdatingSubtask(subtaskId);
	}

	const newCompleted = isSubtaskCompleted
		? completedSubtasks - 1
		: completedSubtasks + 1;

	setCompletedSubtasks(newCompleted);

	const updatedData = {
		is_completed: !isSubtaskCompleted,
	};
	const queryKey = 'subtasks';

	await patch({
		patchFn: updateSubtaskCompletionById,
		resourceId: subtaskId,
		updatedData,
		queryKey,
	});
};
