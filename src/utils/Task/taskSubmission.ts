import { TaskStatusDropdown, TaskSubmit } from '../../interfaces/ITask';
import { SubtaskInput } from '../../interfaces/ISubtask';
import { getNewItemsToAdd } from '../utils';

type Payload = {
	type: string;
	payload: {
		task: {
			task_id: number;
			column_id: number | null;
			title: string;
			description: string;
			positionAndStatus: {
				currentColumnId: number | null;
				newColumnId: number | null;
				currentTaskPosition: number | null;
				newTaskPosition: number | null;
				newStatus: string | null;
			};
		};
		subtasks: {
			toAdd: Array<Partial<SubtaskInput>>;
			toEdit: Array<{ id: number; title: string }>;
			toDelete: number[];
		};
	};
};

export const editTaskSubmission = (
	newTaskData: Partial<TaskSubmit>,
	selectedOption: TaskStatusDropdown,
	taskData: Partial<TaskSubmit> | undefined,
	subtasksToDelete: number[]
) => {
	const taskId: number = taskData?.task_id ?? 0;
	const columnId = taskData?.column_id;

	const payload: Payload = {
		type: 'UPDATE_TASK_INFO',
		payload: {
			task: {
				task_id: taskId,
				column_id: columnId ?? null,
				title: taskData?.title ?? '',
				description: taskData?.description ?? '',
				positionAndStatus: {
					currentColumnId: null,
					newColumnId: null,
					currentTaskPosition: null,
					newTaskPosition: null,
					newStatus: null,
				},
			},
			subtasks: { toAdd: [], toEdit: [], toDelete: [] },
		},
	};

	newTaskData.status = selectedOption.value;

	// Edit title and description
	if (newTaskData.title && newTaskData.title !== taskData?.title) {
		payload.payload.task.title = newTaskData.title;
	}

	// Edit description if it's different from the original description
	if (
		newTaskData.description &&
		newTaskData.description !== taskData?.description
	) {
		payload.payload.task.description = newTaskData.description;
	}

	// Edit position and status
	if (newTaskData.status !== taskData?.status) {
		const newColumnId = selectedOption.id ?? null;
		const newStatus = newTaskData.status ?? null;
		payload.payload.task.positionAndStatus = {
			currentColumnId: columnId ?? null,
			newColumnId: newColumnId,
			currentTaskPosition: taskData?.position ?? null,
			newTaskPosition: null,
			newStatus: newStatus,
		};
	}

	const subtasks = taskData?.subtasks;
	const newSubtasks = newTaskData.subtasks;

	const subtasksHaveChanged = compareSubtasks(subtasks, newSubtasks);

	if (subtasksHaveChanged) {
		if (subtasksToDelete.length > 0) {
			payload.payload.subtasks.toDelete = subtasksToDelete;
		}

		// Edit subtasks
		const editedSubtasks = getEditedSubtask(subtasks, newSubtasks);

		if (editedSubtasks.length > 0) {
			payload.payload.subtasks.toEdit = editedSubtasks.map((subtask) => ({
				id: subtask.subtask_id,
				title: subtask.title,
			}));
		}

		// Add new subtasks
		const newSubtasksToAdd = getNewItemsToAdd<SubtaskInput>(newSubtasks || []);

		if (newSubtasksToAdd.length > 0) {
			payload.payload.subtasks.toAdd = newSubtasksToAdd.map(
				(subtask: SubtaskInput) => {
					delete subtask.placeholder;
					delete subtask.is_new;
					return subtask;
				}
			);
		}
	}
	console.log(payload.payload.task, '<<<<<< payload');

	return payload;
};

const getEditedSubtask = (
	subtasks: SubtaskInput[] | undefined,
	newSubtasks: SubtaskInput[] | undefined
) => {
	const subtasksToEdit = [];

	const subtasksArray = subtasks ?? [];
	const newSubtasksArray = newSubtasks ?? [];

	if (subtasksArray.length === newSubtasksArray.length) {
		for (let i = 0; i < subtasksArray.length; i++) {
			if (
				subtasksArray[i].title !== newSubtasksArray[i].title &&
				!newSubtasksArray[i].is_new
			) {
				subtasksToEdit.push(newSubtasksArray[i]);
			}
		}
	} else {
		for (let i = 0; i < subtasksArray.length; i++) {
			for (let j = 0; j < newSubtasksArray.length; j++) {
				if (subtasksArray[i].subtask_id === newSubtasksArray[j].subtask_id) {
					if (
						subtasksArray[i].title !== newSubtasksArray[j].title &&
						!newSubtasksArray[i].is_new
					) {
						subtasksToEdit.push(newSubtasksArray[j]);
					}
				}
			}
		}
	}
	return subtasksToEdit;
};

function compareSubtasks(
	subtasks: SubtaskInput[] | undefined,
	newSubtasks: SubtaskInput[] | undefined
) {
	const subtasksArray = subtasks ?? [];
	const newSubtasksArray = newSubtasks ?? [];

	if (subtasksArray.length !== newSubtasksArray.length) {
		return true;
	}

	for (let i = 0; i < subtasksArray.length; i++) {
		if (
			subtasksArray[i].subtask_id !== newSubtasksArray[i].subtask_id ||
			subtasksArray[i].title !== newSubtasksArray[i].title
		) {
			return true;
		}
	}

	return false;
}
