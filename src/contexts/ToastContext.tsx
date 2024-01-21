import React, { createContext, useReducer } from 'react';
import ToastsList from '../components/Toast/ToastList';
import { toastReducer } from '../reducer/toastReducer';

export const ToastContext = createContext({});

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
		dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
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

	const value = { success, warning, error, remove };

	return (
		<ToastContext.Provider value={value}>
			<ToastsList toasts={state.toasts} />
			{children}
		</ToastContext.Provider>
	);
};
