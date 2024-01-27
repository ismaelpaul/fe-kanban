import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { SubtaskSubmit } from '../interfaces/ISubtask';
import { SingleColumn } from '../interfaces/IColumn';

interface AxiosConfig extends AxiosRequestConfig {
	credentials?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const kanbanApi = axios.create({
	baseURL: `${baseUrl}`,
	withCredentials: true,
	credentials: 'include',
} as AxiosConfig);

export const getAllBoards = async () => {
	try {
		const response = await kanbanApi.get('/boards');
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const getBoardByBoardId = async (boardId: number) => {
	try {
		const response = await kanbanApi.get(`/boards/${boardId}`);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const addNewBoard = async (newBoardData: object) => {
	try {
		const response = await kanbanApi.post('/boards', newBoardData);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const deleteBoardById = async (boardId: number) => {
	try {
		await kanbanApi.delete(`/boards/${boardId}`);
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
	}
};

export const updateBoardNameById = async (
	boardId: number,
	updatedBoard: object
) => {
	try {
		const response = await kanbanApi.patch(`/boards/${boardId}`, updatedBoard);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
	}
};

export const getColumnsByBoardId = async (boardId: number) => {
	try {
		const response = await kanbanApi.get(`/boards/${boardId}/columns`);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const updatedColumnsByBoardId = async (
	boardId: number,
	newColumns: SingleColumn[]
) => {
	try {
		const response = await kanbanApi.patch(
			`/boards/${boardId}/columns`,
			newColumns
		);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const getTasksByColumnId = async (columnId: number) => {
	try {
		const response = await kanbanApi.get(`/columns/${columnId}/tasks`);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const getSubtasksByTaskId = async (taskId: number) => {
	try {
		const response = await kanbanApi.get(`/tasks/${taskId}/subtasks`);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const updateSubtaskCompletionById = async (
	subtaskId: number,
	completionStatus: object
) => {
	try {
		const response = await kanbanApi.patch(
			`/subtasks/${subtaskId}/completion`,
			completionStatus
		);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const updateSubtaskTitleByid = async (
	subtaskId: number,
	subtaskTitle: object
) => {
	try {
		const response = await kanbanApi.patch(
			`/subtasks/${subtaskId}`,
			subtaskTitle
		);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const addNewTask = async (newTask: object) => {
	try {
		const response = await kanbanApi.post('/tasks', newTask);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const deleteTaskById = async (taskId: number) => {
	try {
		await kanbanApi.delete(`/tasks/${taskId}`);
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
	}
};

export const updateTaskPositionAndStatus = async (
	taskId: number,
	updateTask: object
) => {
	try {
		const response = await kanbanApi.patch(
			`/tasks/${taskId}/position-status`,
			updateTask
		);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const updateTaskTitleAndDescription = async (
	taskId: number,
	updateTask: object
) => {
	try {
		const response = await kanbanApi.patch(`/tasks/${taskId}`, updateTask);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const addNewSubtaskByTaskId = async (
	taskId: number,
	newSubtask: SubtaskSubmit[]
) => {
	try {
		const response = await kanbanApi.post(
			`/tasks/${taskId}/subtasks`,
			newSubtask
		);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const deleteSubtask = async (subtasksToBeDeleted: number[]) => {
	try {
		await kanbanApi.delete('/subtasks', { data: subtasksToBeDeleted });
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const deleteColumnsById = async (columnsToDelete: number[]) => {
	try {
		await kanbanApi.delete(`/columns`, { data: columnsToDelete });
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const addNewColumnsByBoardId = async (
	boardId: number,
	newColumn: object
) => {
	try {
		const response = await kanbanApi.post(`/boards/${boardId}`, newColumn);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};
