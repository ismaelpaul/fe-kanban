import axios, { AxiosError, AxiosRequestConfig } from 'axios';

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

export const addNewBoard = async (newBoard: object) => {
	try {
		const response = await kanbanApi.post('/boards', newBoard);
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

export const updateBoardAndColumns = async (
	boardId: number,
	updatedBoardAndColumns: object
) => {
	try {
		const response = await kanbanApi.patch(
			`/boards/${boardId}`,
			updatedBoardAndColumns
		);
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
			`/subtasks/${subtaskId}`,
			completionStatus
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

export const deleteTaskById = async (taskId: number): Promise<void> => {
	try {
		await kanbanApi.delete(`/tasks/${taskId}`);
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
	}
};

export const updateTaskPosition = async (
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
