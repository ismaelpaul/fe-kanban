import { Reducer } from 'react';
import { IToast } from '../interfaces/IToast';

interface ToastState {
	toasts: IToast[];
}

interface AddToastAction {
	type: 'ADD_TOAST';
	payload: IToast;
}

interface DeleteToastAction {
	type: 'DELETE_TOAST';
	payload: number;
}

type ToastAction = AddToastAction | DeleteToastAction;

export const toastReducer: Reducer<ToastState, ToastAction> = (
	state,
	action
) => {
	let updatedToasts;
	switch (action.type) {
		case 'ADD_TOAST':
			return {
				...state,
				toasts: [...state.toasts, action.payload],
			};
		case 'DELETE_TOAST':
			updatedToasts = state.toasts.filter(
				(toast) => toast.id !== action.payload
			);
			return {
				...state,
				toasts: updatedToasts,
			};
		default:
			throw new Error('Unhandled action type');
	}
};
