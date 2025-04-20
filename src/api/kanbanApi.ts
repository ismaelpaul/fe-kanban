import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { LoginUser, RegisterUser } from '@/interfaces/IAuth';
import { ColumnsInput } from '@/interfaces/IColumn';
import { SingleSubtask, SubtaskSubmit } from '@/interfaces/ISubtask';

interface AxiosConfig extends AxiosRequestConfig {
	credentials?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const kanbanApi = axios.create({
	baseURL: `${baseUrl}`,
	withCredentials: true,
	credentials: 'include',
} as AxiosConfig);

export const getTeams = async () => {
	try {
		const response = await kanbanApi.get('/teams');
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		if (err.response?.status === 401) {
			throw new Error('Not authorized, please log in.');
		} else {
			return err.response?.data;
		}
	}
};

export const addNewTeam = async (teamData: object) => {
	try {
		const response = await kanbanApi.post('/teams', teamData);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const editTeamName = async (teamId: number, teamData: object) => {
	try {
		const response = await kanbanApi.patch(`/teams/${teamId}`, teamData);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
	}
};

export const inviteUserToTeam = async (teamId: number, email: string) => {
	try {
		const response = await kanbanApi.post(`/teams/${teamId}/invitations`, {
			email,
		});
		return response.data;
	} catch (error) {
		const err = error as AxiosError<{ message?: string }>;
		console.log(err.response?.data);
		throw new Error(
			err.response?.data?.message ||
				'Failed to invite user due to a server error.'
		);
	}
};

export const getTeamMembersByTeamId = async (teamId: number) => {
	try {
		const response = await kanbanApi.get(`/users/team_members/${teamId}`);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const getAllBoards = async () => {
	try {
		const response = await kanbanApi.get('/boards');
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		if (err.response?.status === 401) {
			throw new Error('Not authorized, please log in.');
		} else {
			return err.response?.data;
		}
	}
};

export const getBoardsByTeamId = async (teamId: number) => {
	try {
		const response = await kanbanApi.get(`/teams/${teamId}/boards`);

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

export const updateColumnsByBoardId = async (
	boardId: number,
	newColumns: ColumnsInput[]
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
		return response.data as SingleSubtask[];
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

export const updateTaskCompletionById = async (
	taskId: number,
	taskCompletion: object
) => {
	try {
		const response = await kanbanApi.patch(
			`/tasks/${taskId}/completion`,
			taskCompletion
		);
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

export const loginUser = async (userData: LoginUser) => {
	try {
		const response = await kanbanApi.post('/users/login', userData);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		if (err.response?.status === 400) {
			throw new Error('Invalid email or password.');
		} else {
			return err.response?.data;
		}
	}
};

export const logoutUser = async () => {
	try {
		const response = await kanbanApi.post('/users/logout');
		return response.status;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const registerUser = async (userData: RegisterUser) => {
	try {
		const response = await kanbanApi.post('/users/register', userData);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const emailExists = async (email: string) => {
	try {
		const response = await kanbanApi.get(`/users/check-email?email=${email}`);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const getUser = async () => {
	try {
		const response = await kanbanApi.get('/users');
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const getTaskCommentsByTaskId = async (taskId: number) => {
	try {
		const response = await kanbanApi.get(`tasks/${taskId}/comments`);

		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const verifyInvitationToken = async (token: string) => {
	console.log('token', token);

	try {
		const response = await kanbanApi.get(`/invitations/verify/${token}`);
		console.log('>>>>>>>>>> response', response.data);

		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};

export const handleInvitationAction = async (
	action: 'accept' | 'decline',
	token: string
) => {
	try {
		const response = await kanbanApi.post(`/invitations/${token}/${action}`, {
			token,
		});
		return response.data;
	} catch (error) {
		const err = error as AxiosError;
		console.log(err.response?.data);
		return err.response?.data;
	}
};
