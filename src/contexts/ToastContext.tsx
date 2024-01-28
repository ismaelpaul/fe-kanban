import React, { createContext, useReducer } from 'react';
import ToastsList from '../components/Toast/ToastList';
import { toastReducer } from '../reducer/toastReducer';
import { IToast, IToastTypes } from '../interfaces/IToast';

export interface ToastContextValue extends IToastTypes {}

export const ToastContext = createContext<ToastContextValue | undefined>(
	undefined
);

interface ToastContextProviderProps {
	children: React.ReactNode;
}

const initialState = {
	toasts: [],
};

export const ToastContextProvider = ({
	children,
}: ToastContextProviderProps) => {
	const [state, dispatch] = useReducer(toastReducer, initialState);

	const addToast = (type: string, message: string) => {
		const id = Math.floor(Math.random() * 10000000);
		const toast: IToast = { id, message, type };
		dispatch({ type: 'ADD_TOAST', payload: toast });
	};

	const success = (message: string) => {
		addToast('success', message);
	};

	const warning = (message: string) => {
		addToast('warning', message);
	};

	const error = (message: string) => {
		addToast('error', message);
	};

	const remove = (id: number) => {
		dispatch({ type: 'DELETE_TOAST', payload: id });
	};

	const value: IToastTypes = { success, warning, error, remove };

	return (
		<ToastContext.Provider value={value}>
			<ToastsList toasts={state.toasts} />
			{children}
		</ToastContext.Provider>
	);
};
