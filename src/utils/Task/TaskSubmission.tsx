import { QueryClient } from '@tanstack/react-query';
import {
	addNewSubtaskByTaskId,
	addNewTask,
	deleteSubtask,
	updateSubtaskTitleByid,
	updateTaskPositionAndStatus,
	updateTaskTitleAndDescription,
} from '../../api/kanbanApi';
import { TaskStatusDropdown, TaskSubmit } from '../../interfaces/ITask';
import { SingleSubtask, SubtaskInput } from '../../interfaces/ISubtask';
import { getNewItemsToAdd } from '../utils';

type UpdatedTaskTitleAndDescription = {
	title?: string;
	description?: string;
};

export const addNewTaskSubmission = async (
	newTaskData: Partial<TaskSubmit>,
	selectedOption: TaskStatusDropdown,
	queryClient: QueryClient
) => {
	newTaskData.column_id = selectedOption.id;
	newTaskData.status = selectedOption.value;

	const subtasks = newTaskData.subtasks;
	subtasks?.forEach((subtask) => {
		delete subtask.placeholder;
		delete subtask.subtask_id;
		delete subtask.is_new;
	});

	await addNewTask(newTaskData);

	const columnId = selectedOption.id;
	queryClient.invalidateQueries(['tasks', columnId]);
};

export const editTaskSubmission = async (
	newTaskData: Partial<TaskSubmit>,
	selectedOption: TaskStatusDropdown,
	taskData: Partial<TaskSubmit>,
	queryClient: QueryClient,
	subtasksToDelete: number[],
	setSubtasksToDelete: (arg: number[]) => void
) => {
	const taskId: number = taskData?.task_id ?? 0;

	newTaskData.status = selectedOption.value;

	// Edit title and description
	const updatedTaskTitleAndDescription: UpdatedTaskTitleAndDescription = {};
	if (newTaskData.title !== taskData?.title) {
		updatedTaskTitleAndDescription.title = newTaskData.title;
	}
	if (newTaskData.description !== taskData?.description) {
		updatedTaskTitleAndDescription.description = newTaskData.description;
	}

	await updateTaskTitleAndDescription(taskId, updatedTaskTitleAndDescription);

	// Edit position and status
	if (newTaskData.status !== taskData?.status) {
		const columnId = newTaskData.column_id;
		const positionAndStatusData = {
			currentColumnId: columnId,
			newColumnId: selectedOption.id,
			currentTaskPosition: taskData?.position,
			newTaskPosition: null,
			newStatus: newTaskData.status,
		};
		await updateTaskPositionAndStatus(taskId, positionAndStatusData);
	}

	const subtasks = taskData.subtasks;
	const newSubtasks = newTaskData.subtasks;

	const subtasksHaveChanged = compareSubtasks(subtasks, newSubtasks);

	if (subtasksHaveChanged) {
		if (subtasksToDelete.length > 0) {
			await deleteSubtask(subtasksToDelete);
			setSubtasksToDelete([]);
		}

		// Edit subtasks
		const editedSubtasks = getEditedSubtask(subtasks, newSubtasks);

		if (editedSubtasks.length > 0) {
			editedSubtasks.forEach((subtask) => {
				const subtaskId = subtask.subtask_id;
				updateSubtaskTitleByid(subtaskId, subtask);
			});
		}

		// Add new subtasks
		const newSubtasksToAdd = getNewItemsToAdd<SubtaskInput>(newSubtasks || []);

		if (newSubtasksToAdd.length > 0) {
			newSubtasksToAdd.forEach((subtask: SubtaskInput) => {
				delete subtask.placeholder;
				delete subtask.subtask_id;
				delete subtask.is_new;
			});
			await addNewSubtaskByTaskId(taskId, newSubtasksToAdd);
		}
	}

	const queryKey = 'tasks';

	const columnId = taskData?.column_id;
	const newColumnId = selectedOption.id;

	if (newColumnId !== columnId) {
		queryClient.invalidateQueries([queryKey, newColumnId]);
	}

	queryClient.invalidateQueries([queryKey, columnId]);
};

const getEditedSubtask = (
	subtasks: SingleSubtask[],
	newSubtasks: SubtaskInput[]
) => {
	const subtasksToEdit = [];
	if (subtasks.length === newSubtasks.length) {
		for (let i = 0; i < subtasks.length; i++) {
			if (
				subtasks[i].title !== newSubtasks[i].title &&
				!newSubtasks[i].is_new
			) {
				subtasksToEdit.push(newSubtasks[i]);
			}
		}
	} else {
		for (let i = 0; i < subtasks.length; i++) {
			for (let j = 0; j < newSubtasks.length; j++) {
				if (subtasks[i].subtask_id === newSubtasks[j].subtask_id) {
					if (
						subtasks[i].title !== newSubtasks[j].title &&
						!newSubtasks[i].is_new
					) {
						subtasksToEdit.push(newSubtasks[j]);
					}
				}
			}
		}
	}
	return subtasksToEdit;
};

function compareSubtasks(
	subtasks: SingleSubtask[],
	newSubtasks: SubtaskInput[]
) {
	if (subtasks.length !== newSubtasks.length) {
		return true;
	}

	for (let i = 0; i < subtasks.length; i++) {
		if (
			subtasks[i].subtask_id !== newSubtasks[i].subtask_id ||
			subtasks[i].title !== newSubtasks[i].title
		) {
			return true;
		}
	}

	return false;
}
