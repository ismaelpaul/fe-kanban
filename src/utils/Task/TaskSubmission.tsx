import { QueryClient } from '@tanstack/react-query';
import {
	addNewSubtaskByTaskId,
	addNewTask,
	deleteSubtask,
	updateTaskPositionAndStatus,
	updateTaskTitleAndDescription,
} from '../../api/kanbanApi';
import { TaskStatusDropdown, TaskSubmit } from '../../interfaces/ITask';
import { SubtaskInput } from '../../interfaces/ISubtask';

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
	queryClient: QueryClient
) => {
	const taskId: number = taskData.task_id ?? 0;

	newTaskData.status = selectedOption.value;

	// Edit title and description
	const updatedTaskTitleAndDescription: UpdatedTaskTitleAndDescription = {};
	if (newTaskData.title !== taskData.title) {
		updatedTaskTitleAndDescription.title = newTaskData.title;
	}
	if (newTaskData.description !== taskData.description) {
		updatedTaskTitleAndDescription.description = newTaskData.description;
	}

	await updateTaskTitleAndDescription(taskId, updatedTaskTitleAndDescription);

	// Edit subtasks
	if (newTaskData.subtasks) {
		const newSubtasks = newTaskData.subtasks.filter(
			(subtask) => subtask.is_new
		);
		if (newSubtasks.length > 0) {
			newSubtasks.forEach((subtask) => {
				delete subtask.placeholder;
				delete subtask.subtask_id;
				delete subtask.is_new;
			});
			await addNewSubtaskByTaskId(taskId, newSubtasks);
		}

		const subtasksToBeDeleted = getSubtasksToBeDeleted(taskData, newTaskData);

		if (subtasksToBeDeleted.length > 0) {
			await deleteSubtask(subtasksToBeDeleted);
		}

		// Edit position and status
		if (newTaskData.status !== taskData.status) {
			const columnId = newTaskData.column_id;
			const positionAndStatusData = {
				currentColumnId: columnId,
				newColumnId: selectedOption.id,
				currentTaskPosition: taskData.position,
				newTaskPosition: null,
				newStatus: newTaskData.status,
			};
			await updateTaskPositionAndStatus(taskId, positionAndStatusData);
		}
	}

	const queryKey = 'tasks';

	const columnId = taskData.column_id;
	const newColumnId = selectedOption.id;

	if (newColumnId !== columnId) {
		queryClient.invalidateQueries([queryKey, newColumnId]);
	}

	queryClient.invalidateQueries([queryKey, columnId]);
};

//Compares subtasks array from initialValue with subtasks from data submitted
//Returns an array of subtasks ids to be deleted
function getSubtasksToBeDeleted(
	taskData: Partial<TaskSubmit>,
	newTaskData: Partial<TaskSubmit>
) {
	if (newTaskData.subtasks) {
		const dataSubtaskIds = new Set(
			newTaskData.subtasks.map((subtask: SubtaskInput) => subtask.subtask_id)
		);
		if (taskData.subtasks) {
			const subtasksToBeDeleted = taskData.subtasks
				.filter(
					(subtask: SubtaskInput) => !dataSubtaskIds.has(subtask.subtask_id)
				)
				.map((subtask: SubtaskInput) => subtask.subtask_id);

			return subtasksToBeDeleted;
		}
	}
}

// function getPropertiesToPatch
