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
